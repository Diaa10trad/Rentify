using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<List<Favorite>> GetAllFavoritesAsync(string userId);
        Task<Favorite?> GetFavoriteOneAsync(int itemId, string itemType, string userId);
        Task<Favorite> CreateFavoriteAsync(Favorite favoriteModel);
        Task<Favorite?> DeleteFavoriteAsync(int itemId, string itemType, string RequesterId);
    }
}