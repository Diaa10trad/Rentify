using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking.BookingService
{
    public class BookingServiceOwnerUpdateDto
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string AdditionalInfo { get; set; } = string.Empty;

        [Range(0.00, double.MaxValue)]
        [Required]
        public decimal FinalPrice { get; set; }
        [Required]
        [Range(0, 100)]
        public int Refund { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int PermittedDuration { get; set; }

    }
}