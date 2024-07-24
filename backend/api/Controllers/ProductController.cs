using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepo;

        public ProductController(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepo.GetAllProductsAsync();
            var productDTOs = products.Select(p => p.ToProductDTO());
            return Ok(productDTOs);
        }

        // GET: api/product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            var product = await _productRepo.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var productDTO = product.ToProductDTO();
            return Ok(productDTO);
        }

        // POST: api/product
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateDTO productCreateDTO)
        {
            if (!ModelState.IsValid)
            {
              return BadRequest(ModelState);
            }
            
            var product = productCreateDTO.ToProduct();
            await _productRepo.AddProductAsync(product);
            var productDTO = product.ToProductDTO();
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, productDTO);
        }

        // PUT: api/product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] ProductUpdateDTO productUpdateDTO)
        {
            if (id != productUpdateDTO.ProductId)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var existingStock = await _productRepo.GetProductByIdAsync(id);
            if (existingStock == null)
            {
                return NotFound();
            }

            existingStock.UpdateProduct(productUpdateDTO);
            await _productRepo.UpdateProductAsync(existingStock);
            return NoContent();
        }

        // DELETE: api/product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productRepo.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _productRepo.DeleteProductAsync(id);
            return NoContent();
        }

        // GET: api/product/owner/{ownerId}
        [HttpGet("owner/{ownerId}")]
        public async Task<IActionResult> GetProductsByOwner([FromRoute] string ownerId)
        {
            var products = await _productRepo.GetProductsByOwnerAsync(ownerId);
            var productDTO = products.Select(p => p.ToProductDTO());
            return Ok(productDTO);
        }

        // GET: api/product/category/{categoryId}
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategory([FromRoute] int categoryId)
        {
            var products = await _productRepo.GetProductsByCategoryAsync(categoryId);
            var productDTO = products.Select(p => p.ToProductDTO());
            return Ok(productDTO);
        }

        // GET: api/product/search
        [HttpGet("search")]
        public async Task<IActionResult> SearchProducts([FromQuery] string searchTerm)
        {
            var products = await _productRepo.SearchProductsAsync(searchTerm);
            var productDTO = products.Select(p => p.ToProductDTO());
            return Ok(productDTO);
        }
    }
}