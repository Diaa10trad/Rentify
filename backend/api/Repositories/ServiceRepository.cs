using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        private readonly ICloudinaryImageService _cloudinaryImageService;
        public ServiceRepository(ApplicationDBContext dBContext, ICategoryRepository categoryRepository, ICloudinaryImageService cloudinaryImageService)
        {
            _dbContext = dBContext;
            _categoryRepository = categoryRepository;
            _cloudinaryImageService = cloudinaryImageService;
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
            var serviceModel = await _dbContext.Services.Include(S => S.CancellationPolicy)
                                                        .Include(S => S.Location)
                                                        .Include(S => S.Images)
                                                        .Include(s => s.Reviews)
                                                        .FirstOrDefaultAsync(S => S.ServiceId == id);
            if (serviceModel == null)

            {
                return null;
            }
            if (serviceModel.OwnerId != OwnerId)
            {
                return null;
            }
            var images = serviceModel.Images;
            if (images.Any())
            {
                var publicIds = images.Select(image => image.PublicId).ToList();

                var result = await _cloudinaryImageService.DeleteImagesAsync(publicIds);
                if (result.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception("The Images are not Deleted");
                }
            }
            _dbContext.CancellationPolicies.Remove(serviceModel.CancellationPolicy);
            _dbContext.Locations.Remove(serviceModel.Location);
            _dbContext.Reviews.RemoveRange(serviceModel.Reviews);
            _dbContext.Services.Remove(serviceModel);

            await _dbContext.SaveChangesAsync();

            return serviceModel;
        }

        public async Task<IEnumerable<Service>> GetAllAsync()
        {
            return await _dbContext.Services.Include(S => S.CancellationPolicy)
                                            .Include(S => S.Owner)
                                           .Include(S => S.Location)
                                           .Include(S => S.Images)
                                           .Include(S => S.Category)
                                           .Include(S => S.Reviews)
                                           .ThenInclude(r => r.Reviewer)

                                           .ToListAsync();

        }

        public async Task<Service?> GetByIdAsync(int id)
        {
            return await _dbContext.Services.Include(S => S.CancellationPolicy)
                                            .Include(S => S.Location)
                                            .Include(S => S.Owner)
                                            .Include(S => S.Category)
                                            .Include(S => S.Images)
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
                                                           .Include(s => s.Location)
                                                           .Include(s => s.Category)
                                                           .Include(s => s.Images)
                                                           .FirstOrDefaultAsync(S => S.ServiceId == id);

            var existingCategory = await _categoryRepository.GetCategoryByIdAsync(serviceDto.CategoryId);

            if (existingService == null || existingService.OwnerId != OwnerId)
            {
                return null;
            }
            if (existingCategory == null || existingCategory.CategoryType == "product")
            {
                throw new Exception("The Category does not exist");
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

            if (existingService.Location != null)
            {
                existingService.Location.Longitude = serviceDto.Longitude;
                existingService.Location.Latitude = serviceDto.Latitude;
            }

            if (serviceDto.NewImages != null)
            {
                await AddImagesToExistServiceAsync(id, serviceDto.NewImages);
            }

            if (serviceDto.DeletedImages != null)
            {
                var result = await _cloudinaryImageService.DeleteImagesAsync(serviceDto.DeletedImages);
                if (result.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception("The Images Are not Deleted");
                }
                var DeletedImagesModel = existingService.Images
                                             .Where(image => serviceDto.DeletedImages.Contains(image.PublicId))
                                             .ToList();

                _dbContext.ServiceImages.RemoveRange(DeletedImagesModel);
            }

            await _dbContext.SaveChangesAsync();
            return existingService;
        }

        public async Task<List<ServiceImage>> AddImagesToNewServiceAsync(int ServiceId, List<IFormFile> images)
        {
            var serviceModel = await _dbContext.Services.FindAsync(ServiceId);
            if (serviceModel == null)
            {
                throw new Exception("Faild To Add Images");
            }
            List<ServiceImage> serviceImages = new List<ServiceImage>();

            foreach (var image in images)
            {
                var uploadResult = await _cloudinaryImageService.UploadImageToCloudinary(image, $"Services/{ServiceId}");
                if (uploadResult.StatusCode != HttpStatusCode.OK)
                {
                    _dbContext.CancellationPolicies.Remove(serviceModel.CancellationPolicy);
                    _dbContext.Locations.Remove(serviceModel.Location);
                    _dbContext.Services.Remove(serviceModel);
                    await _dbContext.SaveChangesAsync();
                    throw new Exception(uploadResult.Error.Message);
                }

                serviceImages.Add(new ServiceImage
                {
                    ServiceId = ServiceId,
                    PublicId = uploadResult.PublicId,
                    ImageUrl = uploadResult.SecureUrl.ToString()
                });

            }

            await _dbContext.ServiceImages.AddRangeAsync(serviceImages);

            await _dbContext.SaveChangesAsync();

            return serviceImages;
        }

        public async Task<List<ServiceImage>> AddImagesToExistServiceAsync(int ServiceId, List<IFormFile> images)
        {
            var serviceModel = await _dbContext.Services.FindAsync(ServiceId);
            if (serviceModel == null)
            {
                throw new Exception("Faild To Add Images");
            }
            List<ServiceImage> serviceImages = new List<ServiceImage>();

            foreach (var image in images)
            {
                var uploadResult = await _cloudinaryImageService.UploadImageToCloudinary(image, $"Services/{ServiceId}");
                if (uploadResult.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                serviceImages.Add(new ServiceImage
                {
                    ServiceId = ServiceId,
                    PublicId = uploadResult.PublicId,
                    ImageUrl = uploadResult.SecureUrl.ToString()
                });

            }

            await _dbContext.ServiceImages.AddRangeAsync(serviceImages);

            await _dbContext.SaveChangesAsync();

            return serviceImages;
        }
    }
}