using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        [ForeignKey("Reviewer")]
        public string? ReviewerId { get; set; }
        public AppUser Reviewer { get; set; } = null!;

        [Required]
        public string ItemType { get; set; } = string.Empty;

        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public int? ServiceId { get; set; }
        public Service? Service { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
