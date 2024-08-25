using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Favorite;
using api.Models;

namespace api.Mappers
{
    public static class FavoriteMappers
    {
        public static FavoriteDto ToFavoriteDtoFromFavorite(this Favorite favoriteModel)
        {
            return new FavoriteDto
            {
                FavoriteId = favoriteModel.FavoriteId,
                ItemType = favoriteModel.ItemType,
                product = favoriteModel.Product?.ToProductDtoFromProduct(),
                service = favoriteModel.Service?.ToServiceDtoFromService(),
                ProductId = favoriteModel.ProductId ?? null,
                ServiceId = favoriteModel.ServiceId ?? null
            };
        }

    }
}