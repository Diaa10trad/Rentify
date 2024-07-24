using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace api.Dtos.Product
{
    public class ProductCreateDTO
    {
        [Required]
        public string OwnerId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 20)]
        public string Description { get; set; }

        [StringLength(500)]
        public string AdditionalInfo { get; set; }

        [Required]
        [StringLength(100)]
        public string CancellationPolicy { get; set; }

        [Required]
        [StringLength(200)]
        public string Location { get; set; }

        [Required]
        [StringLength(50)]
        public string ProductCondition { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PriceMonthly { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PriceWeekly { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PriceDaily { get; set; }
    }
}