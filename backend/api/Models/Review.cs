using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static api.Enums.Enums;
namespace api.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        [ForeignKey("Reviewer")]
        public string? ReviewerId { get; set; }
        public AppUser Reviewer { get; set; } = null!;

        [ForeignKey("Reviewee")]
        public string? RevieweeId { get; set; }
        public AppUser Reviewee { get; set; } = null!;
        public int ItemId { get; set; }
      

        [Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ReviewerType ReviewerType { get; set; } 

        public ItemType ItemType { get; set; }
        
    }
}
