using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<List<Favorite>> GetAllFavoritesAsync();
        Task<Favorite?> GetFavoriteByIdAsync(int id);
        Task<Favorite> CreateFavoriteAsync(Favorite favoriteModel);
        Task<Favorite?> DeleteFavoriteAsync(int id);
    }
}