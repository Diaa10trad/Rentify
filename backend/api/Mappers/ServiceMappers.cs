using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Service;
using api.Models;

namespace api.Mappers
{
    public static class ServiceMappers
    {
        public static ServiceDto ToServiceDtoFromService(this Service serviceModel)
        {
            return new ServiceDto
            {
                ServiceId = serviceModel.ServiceId,
                OwnerId = serviceModel.OwnerId,
                Owner = serviceModel.Owner?.ToAppUserDtoFromAppUser(),
                Title = serviceModel.Title,
                Description = serviceModel.Description,
                AdditionalInfo = serviceModel.AdditionalInfo,
                Location = serviceModel.Location,
                Category = serviceModel.Category,
                CreatedAt = serviceModel.CreatedAt,
                CancellationPolicy = serviceModel.CancellationPolicy,
                serviceImages = serviceModel.Images.Select(image => image.ToServiceImageDtoFromServiceImage()).ToList(),
            };
        }
        public static Service ToServiceFromServiceCreateDto(this ServiceCreateDto serviceCreateDto)
        {
            return new Service
            {
                Title = serviceCreateDto.Title,
                Description = serviceCreateDto.Description,
                AdditionalInfo = serviceCreateDto.AdditionalInfo,
                Location = new Location { Latitude = serviceCreateDto.Latitude, Longitude = serviceCreateDto.Longitude },
                CategoryId = serviceCreateDto.CategoryId,
                CancellationPolicy = new CancellationPolicy { Refund = serviceCreateDto.Refund, PermittedDuration = serviceCreateDto.PermittedDuration },
            };
        }

        public static Service ToServiceFromServiceUpdateDto(this ServiceUpdateDto serviceUpdateDto)
        {
            return new Service
            {
                Title = serviceUpdateDto.Title,
                Description = serviceUpdateDto.Description,
                AdditionalInfo = serviceUpdateDto.AdditionalInfo,
                Location = new Location { Latitude = serviceUpdateDto.Latitude, Longitude = serviceUpdateDto.Longitude },
                CategoryId = serviceUpdateDto.CategoryId,
                CancellationPolicy = new CancellationPolicy { Refund = serviceUpdateDto.Refund, PermittedDuration = serviceUpdateDto.PermittedDuration },
            };
        }
    }
}