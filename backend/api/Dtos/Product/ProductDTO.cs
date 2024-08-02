using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Product
{
     public class ProductDTO
    {
        public int ProductId { get; set; }
        public string OwnerId { get; set; }
        public string OwnerName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AdditionalInfo { get; set; }
        public string CancellationPolicy { get; set; }
        public string Location { get; set; }
        public string ProductCondition { get; set; }
        public int Quantity { get; set; }
        public decimal PriceMonthly { get; set; }
        public decimal PriceWeekly { get; set; }
        public decimal PriceDaily { get; set; }
       // public ICollection<ReviewDTO> Reviews { get; set; }
    }
}