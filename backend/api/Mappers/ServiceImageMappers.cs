using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ServiceImage;
using api.Models;

namespace api.Mappers
{
    public static class ServiceImageMappers
    {
        public static ServiceImageDto ToServiceImageDtoFromServiceImage(this ServiceImage serviceImage)
        {
            return new ServiceImageDto
            {
                PublicId = serviceImage.PublicId,
                ImageUrl = serviceImage.ImageUrl,
            };
        }
    }
}