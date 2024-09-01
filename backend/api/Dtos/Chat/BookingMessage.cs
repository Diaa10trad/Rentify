using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Chat
{
    public class BookingMessage
    {
        public BookingData data { get; set; }
        public string type { get; set; }
    }
}