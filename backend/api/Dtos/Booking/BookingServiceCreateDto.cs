using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Booking
{
    public class BookingServiceCreateDto
    {   
        public string OwnerId { get; set; } = null!;

        public string RenterId { get; set; } = null!;
        public int ServiceId { get; set; }
        
        public DateTime? StartDate { get; set;}
        public DateTime? EndDate { get; set;}
        public decimal FinalPrice { get; set;}
        public string AdditionalInfo = string.Empty;
        public int Refund { get; set; }
        public int PermittedDuration { get; set; }
        
    }
}