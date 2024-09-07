using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Product;
using api.Helpers;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICloudinaryImageService _cloudinaryImageService;

        public ProductRepository(ApplicationDBContext context, ICategoryRepository categoryRepository, ICloudinaryImageService cloudinaryImageService)
        {
            _dbContext = context;
            _categoryRepository = categoryRepository;
            _cloudinaryImageService = cloudinaryImageService;

        }

        public async Task<(int TotalCount, List<Product> Products)> GetAllProductsAsync(ProductQueryParameters queryParameters)
        {
            var queriedProducts = _dbContext.Products
                                .Include(product => product.CancellationPolicy)
                                .Include(product => product.Location)
                                .Include(product => product.Owner)
                                .Include(product => product.Category)
                                .Include(product => product.Images)
                                .Include(product => product.Reviews)
                                .ThenInclude(r => r.Reviewer)

                                .AsQueryable();



            if (!string.IsNullOrEmpty(queryParameters.Query))
            {
                queriedProducts = queriedProducts.Where(p => p.Title.Contains(queryParameters.Query) || p.Description.Contains(queryParameters.Query));
            }

            if (queryParameters.PriceDailyFrom.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.PriceDaily >= queryParameters.PriceDailyFrom.Value);
            }

            if (queryParameters.PriceDailyTo.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.PriceDaily <= queryParameters.PriceDailyTo.Value);
            }

            if (queryParameters.PriceWeeklyFrom.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.PriceWeekly >= queryParameters.PriceWeeklyFrom.Value);
            }

            if (queryParameters.PriceWeeklyTo.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.PriceWeekly <= queryParameters.PriceWeeklyTo.Value);
            }

            if (queryParameters.PriceMonthlyFrom.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.PriceMonthly >= queryParameters.PriceMonthlyFrom.Value);
            }

            if (queryParameters.PriceMonthlyTo.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.PriceMonthly <= queryParameters.PriceMonthlyTo.Value);
            }


            if (queryParameters.Categories.Any())
            {

                var categories = queryParameters.Categories.Values.ToList();

                queriedProducts = queriedProducts.Where(p => categories.Contains(p.Category.CategoryName));
            }

            if (queryParameters.ProductConditions.Any())
            {

                var productConditions = queryParameters.ProductConditions.Values.ToList();

                queriedProducts = queriedProducts.Where(p => productConditions.Contains(p.ProductCondition));
            }

            if (queryParameters.FromDate.HasValue && queryParameters.ToDate.HasValue)
            {

                var productIds = await _dbContext.Bookings
                                                .Where(booking => booking.StartDate >= queryParameters.FromDate && booking.EndDate <= queryParameters.ToDate && booking.ProductId != null && (booking.Status == "booked" || booking.Status == "in-use"))
                                                .Select(booking => booking.ProductId)
                                                .Distinct()
                                                .ToListAsync();
                queriedProducts = queriedProducts.Where(p => !productIds.Contains(p.ProductId));
            }

            if (queryParameters.Distance.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => ApplicationDBContext.CalculateDistance((double)p.Location.Latitude, (double)p.Location.Longitude, (double)queryParameters.Latitude, (double)queryParameters.Longitude) <= queryParameters.Distance.Value);
            }

            if (queryParameters.Quantity.HasValue)
            {
                queriedProducts = queriedProducts.Where(p => p.Quantity >= queryParameters.Quantity.Value);
            }
            var totalCount = await queriedProducts.CountAsync();

            int pageNumber = Math.Max(queryParameters.PageNumber, 1);
            int pageSize = 24; // Adjust page size as needed
            int skip = (pageNumber - 1) * pageSize;

            var products = await queriedProducts.Skip(skip).Take(pageSize).ToListAsync();
            return (totalCount, products);
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _dbContext.Products
                                .Include(product => product.CancellationPolicy)
                                .Include(product => product.Location)
                                .Include(product => product.Owner)
                                .Include(product => product.Category)
                                .Include(product => product.Images)
                                .Include(product => product.Reviews)
                                .ThenInclude(r => r.Reviewer)
                                .FirstOrDefaultAsync(product => product.ProductId == id);
        }

        public async Task<Product?> CreateProductAsync(Product productModel)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(productModel.CategoryId);
            if (category == null || category.CategoryType == "service")
            {
                return null;
            }

            await _dbContext.Products.AddAsync(productModel);
            await _dbContext.SaveChangesAsync();
            return productModel;
        }


        public async Task<Product?> UpdateProductAsync(int id, ProductUpdateDTO productDto, string OwnerId)
        {
            var existingProduct = await _dbContext.Products.Include(product => product.CancellationPolicy)
                                                            .Include(product => product.Category)
                                                            .Include(product => product.Location)
                                                            .Include(product => product.Images)
                                                            .FirstOrDefaultAsync(product => product.ProductId == id);

            if (existingProduct == null || existingProduct.OwnerId != OwnerId)
            {
                return null;
            }

            existingProduct.Title = productDto.Title;
            existingProduct.ProductCondition = productDto.ProductCondition;
            existingProduct.Quantity = productDto.Quantity;
            existingProduct.PriceMonthly = productDto.PriceMonthly;
            existingProduct.PriceWeekly = productDto.PriceWeekly;
            existingProduct.PriceDaily = productDto.PriceDaily;
            existingProduct.Description = productDto.Description;
            existingProduct.CategoryId = productDto.CategoryId;
            existingProduct.AdditionalInfo = productDto.AdditionalInfo;
            if (existingProduct.CancellationPolicy != null)
            {
                existingProduct.CancellationPolicy.Refund = productDto.Refund;
                existingProduct.CancellationPolicy.PermittedDuration = productDto.PermittedDuration;
            }

            if (existingProduct.Location != null)
            {
                existingProduct.Location.Latitude = productDto.Latitude;
                existingProduct.Location.Longitude = productDto.Longitude;
            }

            if (productDto.NewImages != null)
            {
                await AddImagesToExistProductAsync(id, productDto.NewImages);
            }

            if (productDto.DeletedImages != null)
            {
                var result = await _cloudinaryImageService.DeleteImagesAsync(productDto.DeletedImages);
                if (result.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception("The Images Are not Deleted");
                }
                var DeletedImagesModel = existingProduct.Images
                                             .Where(image => productDto.DeletedImages.Contains(image.PublicId))
                                             .ToList();

                _dbContext.ProductImages.RemoveRange(DeletedImagesModel);
            }
            await _dbContext.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<Product?> DeleteProductAsync(int id, string OwnerId)
        {
            var productModel = await _dbContext.Products.Include(product => product.CancellationPolicy)
                                                        .Include(product => product.Location)
                                                        .Include(product => product.Images)
                                                        .FirstOrDefaultAsync(product => product.ProductId == id);
            if (productModel == null)
            {
                return null;
            }
            if (productModel.OwnerId != OwnerId)
            {
                return null;
            }
            var images = productModel.Images;
            if (images.Any())
            {
                var publicIds = images.Select(image => image.PublicId).ToList();

                var result = await _cloudinaryImageService.DeleteImagesAsync(publicIds);
                if (result.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception("The Images are not Deleted");
                }
            }
            _dbContext.CancellationPolicies.Remove(productModel.CancellationPolicy);
            _dbContext.Locations.Remove(productModel.Location);
            _dbContext.Products.Remove(productModel);
            await _dbContext.SaveChangesAsync();

            return productModel;
        }

        public async Task<List<ProductImage>> AddImagesToNewProductAsync(int ProductId, List<IFormFile> images)
        {
            var productModel = await _dbContext.Products.FindAsync(ProductId);
            if (productModel == null)
            {
                throw new Exception("Faild To Add Images");
            }
            List<ProductImage> productImages = new List<ProductImage>();

            foreach (var image in images)
            {
                var uploadResult = await _cloudinaryImageService.UploadImageToCloudinary(image, $"Products/{ProductId}");
                if (uploadResult.StatusCode != HttpStatusCode.OK)
                {
                    _dbContext.CancellationPolicies.Remove(productModel.CancellationPolicy);
                    _dbContext.Locations.Remove(productModel.Location);
                    _dbContext.Products.Remove(productModel);
                    await _dbContext.SaveChangesAsync();
                    throw new Exception(uploadResult.Error.Message);
                }

                productImages.Add(new ProductImage
                {
                    ProductId = ProductId,
                    PublicId = uploadResult.PublicId,
                    ImageUrl = uploadResult.SecureUrl.ToString()
                });

            }

            await _dbContext.ProductImages.AddRangeAsync(productImages);

            await _dbContext.SaveChangesAsync();

            return productImages;
        }

        public async Task<List<ProductImage>> AddImagesToExistProductAsync(int ProductId, List<IFormFile> images)
        {
            var productModel = await _dbContext.Products.FindAsync(ProductId);
            if (productModel == null)
            {
                throw new Exception("Faild To Add Images");
            }
            List<ProductImage> productImages = new List<ProductImage>();

            foreach (var image in images)
            {
                var uploadResult = await _cloudinaryImageService.UploadImageToCloudinary(image, $"Products/{ProductId}");
                if (uploadResult.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                productImages.Add(new ProductImage
                {
                    ProductId = ProductId,
                    PublicId = uploadResult.PublicId,
                    ImageUrl = uploadResult.SecureUrl.ToString()
                });

            }

            await _dbContext.ProductImages.AddRangeAsync(productImages);

            await _dbContext.SaveChangesAsync();

            return productImages;
        }
    }
}