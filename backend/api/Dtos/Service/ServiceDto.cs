using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.ServiceImage;
using api.Dtos.Review;
using api.Models;

namespace api.Dtos.Service
{
        public class ServiceDto
        {
                public int ServiceId { get; set; }
                public required string OwnerId { get; set; }
                public AppUserDto? Owner { get; set; }
                public Category Category { get; set; }
                public string Title { get; set; }
                public string Description { get; set; }
                public Location Location { get; set; } = null!;
                public DateTime CreatedAt { get; set; }

                public string AdditionalInfo { get; set; }

                public CancellationPolicy CancellationPolicy { get; set; }

                public ICollection<ReviewDto> Reviews { get; set; }


                public List<ServiceImageDto> serviceImages { get; set; }

        }
}