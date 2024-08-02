using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Product 
    {   
        [Key]
        public int ProductId { get; set; }

        [ForeignKey("Owner")]
        public string? OwnerId { get; set; }
        public AppUser? Owner { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 10)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string AdditionalInfo { get; set; } = string.Empty;

        [Required]
        public CancellationPolicy CancellationPolicy { get; set; } = null!;

        [Required]
        public Location Location { get; set; } = null!;
        [Required]
        public string ProductCondition { get; set; } = string.Empty;

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal PriceMonthly { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal PriceWeekly { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal PriceDaily { get; set; }

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}