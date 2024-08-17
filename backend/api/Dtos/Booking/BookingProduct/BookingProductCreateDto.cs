using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Booking.BookingProduct
{
    public class BookingProductCreateDto
    {
        [Required]
        public string OwnerId { get; set; } = null!;

        [Required]
        public string RenterId { get; set; } = null!;

        [Required]
        public int ProductId { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [Range(0.00, double.MaxValue)]
        [Required]
        public decimal FinalPrice { get; set; }
        public string AdditionalInfo { get; set; } = string.Empty;

        [Required]
        [Range(0, 100)]
        public int Refund { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int PermittedDuration { get; set; }

    }
}