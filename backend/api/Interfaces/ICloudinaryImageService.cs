using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace api.Interfaces
{
    public interface ICloudinaryImageService
    {
        Task<ImageUploadResult> UploadImageToCloudinary(IFormFile image, string AssetFolder, bool? Overwrite = false, string PublicId = "", bool UseFilename = false);
        Task<DelResResult> DeleteImagesAsync(List<string> publicIds);
    }
}