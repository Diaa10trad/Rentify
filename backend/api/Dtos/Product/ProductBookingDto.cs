using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductImage;
using api.Models;

namespace api.Dtos.Product
{
    public class ProductBookingDto
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public Location Location { get; set; } = null!;
        public ProductImageDto? productImage { get; set; }
    }
}