using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Service;
using api.Models;

namespace api.Dtos.Booking
{
    public class BookingServiceForRenterDto
    {
        public int BookingId { get; set; }

        public UserBookingDto? Owner { get; set; }
        public UserBookingDto? Renter { get; set; }

        public ServiceDto? Service { get; set; }
        
        public DateTime? StartDate { get; set;}
        public DateTime? EndDate { get; set;}
        public decimal FinalPrice { get; set;}
        public string AdditionalInfo = string.Empty;
        public CancellationPolicy CancellationPolicy { get; set; } 

        public string Status { get; set; } = "pending";

        public DateTime? PickUpDate { get; set;}
        public DateTime? ReturnDate { get; set;}
        public DateTime? CreatedAt { get; set;}
        public int? PickUpCode { get; set; }
    
    }
}