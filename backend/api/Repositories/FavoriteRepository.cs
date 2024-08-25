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
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public FavoriteRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Favorite> CreateFavoriteAsync(Favorite favoriteModel)
        {

            var existingFavorite = await _dbContext.Favorites
                                                   .FirstOrDefaultAsync(f =>
                                                    f.UserId == favoriteModel.UserId &&
                                                    f.ItemType == favoriteModel.ItemType &&
                                                    ((f.ItemType == "product" && f.ProductId == favoriteModel.ProductId) ||
                                                    (f.ItemType == "service" && f.ServiceId == favoriteModel.ServiceId)));

            if (existingFavorite != null)
            {
                throw new Exception("This item is already in your favorites.");
            }

            if (favoriteModel.ItemType == "product")
            {
                var product = await _dbContext.Products.FindAsync(favoriteModel.ProductId);
                if (product == null)
                {
                    throw new Exception("Product not found");
                }
                favoriteModel.Product = product;
            }
            else if (favoriteModel.ItemType == "service")
            {
                var service = await _dbContext.Services.FindAsync(favoriteModel.ServiceId);
                if (service == null)
                {
                    throw new Exception("Service not found");
                }
                favoriteModel.Service = service;
            }
            else
            {
                throw new Exception("Invalid ItemType");
            }

            await _dbContext.Favorites.AddAsync(favoriteModel);
            await _dbContext.SaveChangesAsync();
            return favoriteModel;
        }

        public async Task<Favorite?> DeleteFavoriteAsync(int id)
        {
            var favoriteModel = await _dbContext.Favorites.FirstOrDefaultAsync(F => F.FavoriteId == id);

            if (favoriteModel == null)
            {
                throw new Exception("favorite not found");
            }

            _dbContext.Favorites.Remove(favoriteModel);
            await _dbContext.SaveChangesAsync();
            return favoriteModel;
        }

        public async Task<List<Favorite>> GetAllFavoritesAsync(string userId)
        {
            return await _dbContext.Favorites.Include(F => F.Product)

                                             .Include(F => F.Service)
                                             .Where(F => F.UserId == userId)
                                             .ToListAsync();
        }

        public async Task<Favorite?> GetFavoriteByIdAsync(int id, string userId)
        {
            return await _dbContext.Favorites.Include(F => F.Product)
                                            .Include(F => F.Service)
                                             .FirstOrDefaultAsync(F => F.FavoriteId == id && F.UserId == userId);
        }
    }
}