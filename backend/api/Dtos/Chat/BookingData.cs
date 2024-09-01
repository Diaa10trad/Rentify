using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Chat
{
    public class BookingData
    {
        public int? bookingId { get; set; }
        public string ownerId { get; set; }
        public string renterId { get; set; }
        public int? itemId { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public decimal finalPrice { get; set; }
        public string additionalInfo { get; set; }
        public string status { get; set; }
        public int refund { get; set; }
        public int permittedDuration { get; set; }
        public string itemType { get; set; }

    }
}