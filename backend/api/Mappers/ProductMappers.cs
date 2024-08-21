using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Models;

namespace api.Mappers
{
    public static class ProductMappers
    {
        public static ProductReviewDto ToProductReviewDtoFromProduct(this Product product)
        {
            return new ProductReviewDto
            {
                ProductId = product.ProductId,
                OwnerId = product.OwnerId,
                Title = product.Title,

            };
        }
        public static ProductDTO ToProductDtoFromProduct(this Product product)
        {
            return new ProductDTO
            {
                ProductId = product.ProductId,
                OwnerId = product.OwnerId,
                Owner = product.Owner?.ToAppUserDtoFromAppUser(),
                Category = product.Category,
                Title = product.Title,
                Description = product.Description,
                CreatedAt = product.CreatedAt,
                AdditionalInfo = product.AdditionalInfo,
                CancellationPolicy = product.CancellationPolicy,
                Location = product.Location,
                ProductCondition = product.ProductCondition,
                Quantity = product.Quantity,
                PriceMonthly = product.PriceMonthly,
                PriceWeekly = product.PriceWeekly,
                PriceDaily = product.PriceDaily,
                Reviews = product.Reviews.Select(review => review.ToReviewDtoFromReview()).ToList(),

                productImages = product.Images.Select(image => image.ToProductImageDtoFromProductImage()).ToList(),

            };
        }

        public static Product ToProductFromProductCreateDto(this ProductCreateDTO productCreateDto)
        {
            return new Product
            {
                Title = productCreateDto.Title,
                CategoryId = productCreateDto.CategoryId,
                Description = productCreateDto.Description,
                AdditionalInfo = productCreateDto.AdditionalInfo,
                CancellationPolicy = new CancellationPolicy { Refund = productCreateDto.Refund, PermittedDuration = productCreateDto.PermittedDuration },
                Location = new Location { Latitude = productCreateDto.Latitude, Longitude = productCreateDto.Longitude },
                ProductCondition = productCreateDto.ProductCondition,
                Quantity = productCreateDto.Quantity,
                PriceMonthly = productCreateDto.PriceMonthly,
                PriceWeekly = productCreateDto.PriceWeekly,
                PriceDaily = productCreateDto.PriceDaily

            };
        }

        public static Product ToProductFromProductUpdateDto(this Product product, ProductUpdateDTO productUpdateDto)
        {
            return new Product
            {
                Title = productUpdateDto.Title,
                CategoryId = productUpdateDto.CategoryId,
                Description = productUpdateDto.Description,
                AdditionalInfo = productUpdateDto.AdditionalInfo,
                CancellationPolicy = new CancellationPolicy { Refund = productUpdateDto.Refund, PermittedDuration = productUpdateDto.PermittedDuration },
                Location = new Location { Latitude = productUpdateDto.Latitude, Longitude = productUpdateDto.Longitude },
                ProductCondition = productUpdateDto.ProductCondition,
                Quantity = productUpdateDto.Quantity,
                PriceMonthly = productUpdateDto.PriceMonthly,
                PriceWeekly = productUpdateDto.PriceWeekly,
                PriceDaily = productUpdateDto.PriceDaily
            };
        }
    }
}