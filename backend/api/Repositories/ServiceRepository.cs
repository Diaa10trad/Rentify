using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Service;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly ICategoryRepository _categoryRepository;
        public ServiceRepository(ApplicationDBContext dBContext, ICategoryRepository categoryRepository)
        {
            _dbContext = dBContext;
            _categoryRepository = categoryRepository;
        }

        public async Task<Service?> CreateAsync(Service serviceModel)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(serviceModel.CategoryId);
            if (category == null || category.CategoryType == "product")
            {
                return null;
            }
            await _dbContext.Services.AddAsync(serviceModel);
            await _dbContext.SaveChangesAsync();
            return serviceModel;
        }

        public async Task<Service?> DeleteAsync(int id, string OwnerId)
        {
            var serviceModel = await _dbContext.Services.Include(s => s.Reviews).FirstOrDefaultAsync(S => S.ServiceId == id);
            if (serviceModel == null)
            {
                return null;
            }
            if (serviceModel.OwnerId != OwnerId)
            {
                return null;
            }
            _dbContext.Reviews.RemoveRange(serviceModel.Reviews);
            _dbContext.Services.Remove(serviceModel);
            await _dbContext.SaveChangesAsync();

            return serviceModel;
        }

        public async Task<IEnumerable<Service>> GetAllAsync()
        {
            return await _dbContext.Services.Include(S => S.CancellationPolicy)
                                            .Include(S => S.Category)
                                            .Include(S => S.Reviews)
                                            .ThenInclude(r => r.Reviewer)
                                            .ToListAsync();

        }

        public async Task<Service?> GetByIdAsync(int id)
        {
            return await _dbContext.Services.Include(S => S.CancellationPolicy)
                                            .Include(S => S.Category)
                                            .Include(S => S.Reviews)
                                            .ThenInclude(r => r.Reviewer)
                                            .FirstOrDefaultAsync(service => service.ServiceId == id);

        }

        // public Task<bool> ServiceExists(int id)
        // {
        //     return _dbContext.Services.AnyAsync(service => service.ServiceId == id);
        // }

        public async Task<Service?> UpdateAsync(int id, ServiceUpdateDto serviceDto, string OwnerId)
        {
            var existingService = await _dbContext.Services.Include(s => s.CancellationPolicy)
                                                           .Include(s => s.Category)
                                                           .FirstOrDefaultAsync(S => S.ServiceId == id);

            if (existingService == null || existingService.OwnerId != OwnerId)
            {
                return null;
            }

            existingService.Title = serviceDto.Title;
            existingService.Description = serviceDto.Description;
            existingService.CategoryId = serviceDto.CategoryId;
            existingService.AdditionalInfo = serviceDto.AdditionalInfo;
            if (existingService.CancellationPolicy != null)
            {
                existingService.CancellationPolicy.Refund = serviceDto.Refund;
                existingService.CancellationPolicy.PermittedDuration = serviceDto.PermittedDuration;
            }




            await _dbContext.SaveChangesAsync();
            return existingService;
        }
    }
}