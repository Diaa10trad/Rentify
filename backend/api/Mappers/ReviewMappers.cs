using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUserDto;
using api.Dtos.Review;
using api.Models;

namespace api.Mappers
{
    public static class ReviewMappers
    {

        public static ReviewDto ToReviewDtoFromReview(this Review reviewModel)
        {

            return new ReviewDto
            {
                ReviewId = reviewModel.ReviewId,
                Reviewer = reviewModel.Reviewer.ToAppUserReviewDtoFromAppUser() ?? new AppUserReviewDto(),
                Product = reviewModel.Product?.ToProductReviewDtoFromProduct() ?? null,
                Service = reviewModel.Service?.ToServiceReviewDtoFromService() ?? null,
                Rating = reviewModel.Rating,
                Comment = reviewModel.Comment,
                CreatedAt = reviewModel.CreatedAt
            };
        }

        public static Review ToReviewFromReviewCreateDto(this ReviewCreateDto reviewDto)
        {
            return new Review
            {
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment
            };
        }

        public static Review ToReviewFromReviewUpdateDto(this ReviewUpdateDto reviewDto)
        {
            return new Review
            {
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment
            };
        }
    }
}