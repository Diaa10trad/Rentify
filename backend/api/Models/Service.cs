using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Service
    {
        [Key]
        public int ServiceId { get; set; }

        [ForeignKey("Owner")]
        [Required]
        public string? OwnerId { get; set; }
        public AppUser? Owner { get; set; }

        [ForeignKey("Category")]
        [Required]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string AdditionalInfo { get; set; } = string.Empty;

        [Required]
        public CancellationPolicy CancellationPolicy { get; set; } = null!;

        [Required]
        public Location Location { get; set; } = null!;

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}