// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using api.Dtos.Product;
// using api.Models;

// namespace api.Mappers
// {
//     public static class ProductMappers
//     {
//         public static ProductDTO ToProductDTO(this Product product)
//         {
//             return new ProductDTO
//             {
//                 ProductId = product.ProductId,
//                 OwnerId = product.OwnerId,
//                 OwnerName = product.Owner?.Name,
//                 CategoryId = product.CategoryId,
//                 CategoryName = product.Category?.Name,
//                 Title = product.Title,
//                 Description = product.Description,
//                 CreatedAt = product.CreatedAt,
//                 AdditionalInfo = product.AdditionalInfo,
//                 CancellationPolicy = product.CancellationPolicy?.PolicyName,
//                 Location = product.Location?.Address,
//                 ProductCondition = product.ProductCondition,
//                 Quantity = product.Quantity,
//                 PriceMonthly = product.PriceMonthly,
//                 PriceWeekly = product.PriceWeekly,
//                 PriceDaily = product.PriceDaily,
//             };
//         }

//         public static Product ToProduct(this ProductCreateDTO productCreateDTO)
//         {
//             return new Product
//             {
//                 OwnerId = productCreateDTO.OwnerId,
//                 CategoryId = productCreateDTO.CategoryId,
//                 Title = productCreateDTO.Title,
//                 Description = productCreateDTO.Description,
//                 AdditionalInfo = productCreateDTO.AdditionalInfo,
//                 CancellationPolicy = new CancellationPolicy { PolicyName = productCreateDTO.CancellationPolicy },
//                 Location = new Location { Address = productCreateDTO.Location },
//                 ProductCondition = productCreateDTO.ProductCondition,
//                 Quantity = productCreateDTO.Quantity,
//                 PriceMonthly = productCreateDTO.PriceMonthly,
//                 PriceWeekly = productCreateDTO.PriceWeekly,
//                 PriceDaily = productCreateDTO.PriceDaily
//             };
//         }

//         public static void ToProduct(this Product product, ProductUpdateDTO productUpdateDTO)
//         {
//             product.OwnerId = productUpdateDTO.OwnerId;
//             product.CategoryId = productUpdateDTO.CategoryId;
//             product.Title = productUpdateDTO.Title;
//             product.Description = productUpdateDTO.Description;
//             product.AdditionalInfo = productUpdateDTO.AdditionalInfo;
//             product.CancellationPolicy = new CancellationPolicy { PolicyName = productUpdateDTO.CancellationPolicy };
//             product.Location = new Location { Address = productUpdateDTO.Location };
//             product.ProductCondition = productUpdateDTO.ProductCondition;
//             product.Quantity = productUpdateDTO.Quantity;
//             product.PriceMonthly = productUpdateDTO.PriceMonthly;
//             product.PriceWeekly = productUpdateDTO.PriceWeekly;
//             product.PriceDaily = productUpdateDTO.PriceDaily;
//         }
//     }
// }