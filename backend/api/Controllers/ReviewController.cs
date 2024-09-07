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

        public ReviewController(IReviewRepository reviewRepository)
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

        [HttpGet("{itemType}/{itemId}")]

        public async Task<IActionResult> GetOne([FromRoute] string itemType, [FromRoute] int itemId)
        {

            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (RequesterId == null)
            {
                return Unauthorized();
            }

            var review = await _reviewRepository.GetReviewOneAsync(itemType, itemId, RequesterId);

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

            int mappedId = 0;
            if (itemType == "product")
            {
                reviewModel.ProductId = itemId;
                mappedId = reviewModel.ProductId.Value;

            }
            else if (itemType == "service")
            {
                reviewModel.ServiceId = itemId;
                mappedId = reviewModel.ServiceId.Value;
            }
            await _reviewRepository.CreateReviewAsync(reviewModel, RequesterId);

            return CreatedAtAction(nameof(GetOne), new { itemType = reviewModel.ItemType, itemId = mappedId }, reviewModel.ToReviewDtoFromReview());

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