using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Dtos.Product
{
    public class ProductUpdateDTO
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(1000, MinimumLength = 20)]
        public string Description { get; set; } = string.Empty;

        [StringLength(500)]
        public string AdditionalInfo { get; set; }

        [Required]
        [Range(0, 100)]
        public int Refund { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int PermittedDuration { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal Longitude { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal Latitude { get; set; }

        [Required]
        [StringLength(50)]
        public string ProductCondition { get; set; } = string.Empty;

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PriceMonthly { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PriceWeekly { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PriceDaily { get; set; }

        public List<IFormFile>? NewImages { get; set; }

        public List<string>? DeletedImages { get; set; }

    }
}