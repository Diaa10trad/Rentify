using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Service
{
    public class ServiceReviewDto
    {
        public int ServiceId { get; set; }
        public required string OwnerId { get; set; }
        public string Title { get; set; }

    }
}