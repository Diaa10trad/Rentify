using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductImage;
using api.Models;

namespace api.Mappers
{
    public static class ProductImageMappers
    {
        public static ProductImageDto ToProductImageDtoFromProductImage(this ProductImage productImage)
        {
            return new ProductImageDto
            {
                PublicId = productImage.PublicId,
                ImageUrl = productImage.ImageUrl,
            };
        }
    }
}