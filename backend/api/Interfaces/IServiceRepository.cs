using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Service;
using api.Models;

namespace api.Interfaces
{
    public interface IServiceRepository
    {
        Task<IEnumerable<Service>> GetAllAsync();
        Task<Service?> GetByIdAsync(int id);
        Task<Service?> CreateAsync(Service serviceModel);
        //Task<Service?> UpdateAsync(int id);
        Task<Service?> DeleteAsync(int id, string OwnerId);
        Task<Service?> UpdateAsync(int id, ServiceUpdateDto serviceDto, string OwnerId);

    }
}