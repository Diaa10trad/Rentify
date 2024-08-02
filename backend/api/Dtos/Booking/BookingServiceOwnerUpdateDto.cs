using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class BookingServiceOwnerUpdateDto
    {
        public DateTime? StartDate { get; set;}
        public DateTime? EndDate { get; set;}
        public decimal FinalPrice { get; set;}
        public string AdditionalInfo = string.Empty;
        public int Refund { get; set; }
        public int PermittedDuration { get; set; }
    }
}