using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Review;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/review")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewController(IReviewRepository reviewRepository, ICategoryRepository categoryRepository, IProductRepository productRepository, IServiceRepository serviceRepository)
        {
            _reviewRepository = reviewRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewRepository.GetAllReviewsAsync();

            var reviewDto = reviews.Select(review => review.ToReviewDtoFromReview());

            return Ok(reviewDto);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            var reviewDto = review.ToReviewDtoFromReview();
            return Ok(reviewDto);
        }

        [HttpPost("{itemType}/{itemId}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int itemId, [FromRoute] string itemType, [FromBody] ReviewCreateDto reviewDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (RequesterId == null)
            {
                return Unauthorized();
            }

            var reviewModel = reviewDto.ToReviewFromReviewCreateDto();
            reviewModel.ReviewerId = RequesterId;
            reviewModel.ItemType = itemType;
            if (itemType == "product")
            {
                reviewModel.ProductId = itemId;
            }
            else if (itemType == "service")
            {
                reviewModel.ServiceId = itemId;
            }
            await _reviewRepository.CreateReviewAsync(reviewModel, RequesterId);

            return CreatedAtAction(nameof(GetById), new { id = reviewModel.ReviewId }, reviewModel.ToReviewDtoFromReview());

        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ReviewUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (RequesterId == null)
            {
                return Unauthorized();
            }

            var reviewModel = await _reviewRepository.UpdateReviewAsync(id, updateDto.ToReviewFromReviewUpdateDto(), RequesterId);

            if (reviewModel == null)
            {
                NotFound(" Review Not Found");
            }
            reviewModel.ReviewerId = RequesterId;

            return Ok(reviewModel.ToReviewDtoFromReview());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var reviewModel = await _reviewRepository.DeleteReviewAsync(id);

            if (reviewModel == null)
            {
                return NotFound("Review not found");
            }

            return Ok(reviewModel);
        }

    }
}