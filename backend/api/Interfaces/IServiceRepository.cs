using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Service;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IServiceRepository
    {
        Task<(int TotalCount, List<Service> Services)> GetAllAsync(ServiceQueryParameters queryParameters);
        Task<Service?> GetByIdAsync(int id);
        Task<Service?> CreateAsync(Service serviceModel);
        Task<Service?> DeleteAsync(int id, string OwnerId);
        Task<Service?> UpdateAsync(int id, ServiceUpdateDto serviceDto, string OwnerId);

        Task<List<ServiceImage>> AddImagesToNewServiceAsync(int ServiceId, List<IFormFile> images);

        Task<List<ServiceImage>> AddImagesToExistServiceAsync(int ServiceId, List<IFormFile> images);

    }
}