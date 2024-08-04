using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Review;
using api.Models;

namespace api.Dtos.Product
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public required string OwnerId { get; set; }
        public Category Category { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AdditionalInfo { get; set; }
        public Location Location { get; set; } = null!;
        public CancellationPolicy CancellationPolicy { get; set; }
        public string ProductCondition { get; set; }
        public int Quantity { get; set; }
        public decimal PriceMonthly { get; set; }
        public decimal PriceWeekly { get; set; }
        public decimal PriceDaily { get; set; }
        public ICollection<ReviewDto> Reviews { get; set; }

    }
}