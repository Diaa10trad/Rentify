using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public ReviewRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Review> CreateReviewAsync(Review reviewModel, string RequesterId)
        {

            if (reviewModel.ItemType == "product")
            {
                var product = await _dbContext.Products.FindAsync(reviewModel.ProductId);
                if (product == null)
                {
                    throw new Exception("Product not found");
                }
                reviewModel.Product = product;
            }
            else if (reviewModel.ItemType == "service")
            {
                var service = await _dbContext.Services.FindAsync(reviewModel.ServiceId);
                if (service == null)
                {
                    throw new Exception("Service not found");
                }
                reviewModel.Service = service;
            }
            else
            {
                throw new Exception("Invalid ItemType");
            }

            var reviewer = await _dbContext.Users.FindAsync(RequesterId);
            if (reviewer == null)
            {
                throw new Exception("Reviewer not found");
            }
            reviewModel.Reviewer = reviewer;

            await _dbContext.Reviews.AddAsync(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
        }


        public async Task<List<Review>> GetAllReviewsAsync()
        {
            return await _dbContext.Reviews.Include(R => R.Product)
                                            .Include(R => R.Reviewer)
                                            .Include(R => R.Service)
                                            .ToListAsync();
        }

        public async Task<Review?> GetReviewOneAsync(string itemType, int itemId, string RequesterId)
        {
            if (itemType == "product")
                return await _dbContext.Reviews.Include(R => R.Product)
                                                .Include(R => R.Service)
                                                .Include(R => R.Reviewer)
                                                .FirstOrDefaultAsync(R => R.ItemType == "product" && R.ProductId == itemId && R.ReviewerId == RequesterId);
            else if (itemType == "service")
                return await _dbContext.Reviews.Include(R => R.Product)
                                                .Include(R => R.Service)
                                                .Include(R => R.Reviewer)
                                                .FirstOrDefaultAsync(R => R.ItemType == "service" && R.ServiceId == itemId && R.ReviewerId == RequesterId);
            return null;
        }

        public async Task<Review?> UpdateReviewAsync(int id, Review reviewModel, string RequesterId)
        {

            //var booking = _dbContext.Bookings.Where(ProductId == RM.itemId && (owner.id == RequesterId || renter.id == RequesterId) ).FirstOrDefault();

            var existingReview = await _dbContext.Reviews.Where(r => r.ReviewId == id && r.ReviewerId == RequesterId).FirstOrDefaultAsync();

            if (existingReview == null)
            {
                throw new Exception("Review not found");
            }

            existingReview.Rating = reviewModel.Rating;
            existingReview.Comment = reviewModel.Comment;

            var reviewer = await _dbContext.Users.FindAsync(RequesterId);
            if (reviewer == null)
            {
                throw new Exception("Reviewer not found");
            }
            reviewModel.Reviewer = reviewer;

            await _dbContext.SaveChangesAsync();
            return existingReview;
        }

        public async Task<Review?> DeleteReviewAsync(int id)
        {
            var reviewModel = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.ReviewId == id);

            if (reviewModel == null)
            {
                throw new Exception("Review not found");
            }

            _dbContext.Reviews.Remove(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
        }

    }
}