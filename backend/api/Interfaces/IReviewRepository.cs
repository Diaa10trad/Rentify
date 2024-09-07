using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IReviewRepository
    {
        Task<List<Review>> GetAllReviewsAsync();
        Task<Review?> GetReviewOneAsync(string itemType, int itemId, string RequesterId);
        Task<Review> CreateReviewAsync(Review reviewModel, string RequesterId);
        Task<Review?> UpdateReviewAsync(int id, Review reviewModel, string RequesterId);
        Task<Review?> DeleteReviewAsync(int id);
    }
}