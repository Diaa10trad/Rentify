using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Booking
    {
        public int BookingId { get; set; }

        public string OwnerId { get; set; } = null!;
        public AppUser Owner { get; set; } = null!;

        public string RenterId { get; set; } = null!;
        public AppUser Renter { get; set; } = null!;
        public DateTime? CreatedAt { get; set;}
        public DateTime? StartDate { get; set;}
        public DateTime? EndDate { get; set;}

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0, double.MaxValue)]
        public decimal FinalPrice { get; set;}

        [Range(1000, 9999)]
        public int PickUpCode { get; set; }
        public DateTime? PickUpDate { get; set;}

        [Range(1000, 9999)]
        public int ReturnCode { get; set; }
        public DateTime? ReturnDate { get; set;}

        public string AdditionalInfo = string.Empty;

        public string Status {get; set;} = "pending"; 
        public int? ProductId { get; set; }
        public Product? Product { get; set; }

        public int? ServiceId { get; set; }
        public Service? Service { get; set; }
        public CancellationPolicy CancellationPolicy { get; set; }
    }
}