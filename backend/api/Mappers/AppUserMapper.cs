using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Models;

namespace api.Mappers
{
    public static class AppUserMapper
    {
        public static AppUserReviewDto ToAppUserReviewDtoFromAppUser(this AppUser appUser)
        {
            return new AppUserReviewDto
            {
                UserId = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Avatar = appUser.Avatar,

            };
        }

        public static AppUserSpecificDto ToAppUserSpecificDtoFromAppUser(this AppUser appUser)
        {

            var allReviews = appUser.Services
                .SelectMany(s => s.Reviews)
                .Concat(appUser.Products.SelectMany(p => p.Reviews))
                .OrderByDescending(review => review.CreatedAt)
                .ToList();

            return new AppUserSpecificDto
            {
                UserId = appUser.Id,
                Email = appUser.Email,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Avatar = appUser.Avatar,
                Products = appUser.Products.Select(p => p.ToProductDtoFromProduct()).ToList(),
                Services = appUser.Services.Select(s => s.ToServiceDtoFromService()).ToList(),
                Favorites = appUser.Favorites.Select(f => f.ToFavoriteDtoFromFavorite()).ToList(),
                Reviews = allReviews.Select(r => r.ToReviewDtoFromReview()).ToList(),
                TotalReviews = allReviews.Count(),
                AverageRating = allReviews.Any() ? allReviews.Average(review => review.Rating) : 0,
            };
        }


        public static UserBookingDto ToUserBookingDtoFromAppUser(this AppUser appUser)
        {

            return new UserBookingDto
            {
                UserId = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Avatar = appUser.Avatar,
            };
        }

        public static AppUserDto ToAppUserDtoFromAppUser(this AppUser appUser)
        {
            var allReviews = appUser.Services
                .SelectMany(s => s.Reviews)
                .Concat(appUser.Products.SelectMany(p => p.Reviews))
                .OrderByDescending(review => review.CreatedAt)
                .ToList();

            return new AppUserDto
            {
                UserId = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Avatar = appUser.Avatar,
                TotalReviews = allReviews.Count(),
                AverageRating = allReviews.Any() ? allReviews.Average(review => review.Rating) : 0,

            };
        }
    }
}