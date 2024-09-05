using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ServiceImage;
using api.Models;

namespace api.Dtos.Service
{
    public class ServiceBookingDto
    {
        public int ServiceId { get; set; }
        public string Title { get; set; }
        public Location Location { get; set; } = null!;
        public ServiceImageDto serviceImage { get; set; }
    }
}