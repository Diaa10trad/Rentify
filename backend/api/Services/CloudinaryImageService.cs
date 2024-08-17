using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace api.Services
{
    public class CloudinaryImageService : ICloudinaryImageService
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryImageService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        public async Task<DelResResult> DeleteImagesAsync(List<string> publicIds)
        {

            var delParams = new DelResParams()
            {
                PublicIds = publicIds,
                Invalidate = true,
            };

            var delResult = await _cloudinary.DeleteResourcesAsync(delParams);

            return delResult;
        }



        public async Task<ImageUploadResult> UploadImageToCloudinary(IFormFile image, string AssetFolder, bool? Overwrite = false, string PublicId = "", bool UseFilename = false)
        {
            var uploadResult = new ImageUploadResult();

            if (image.Length > 0)
            {
                using (var stream = image.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(image.FileName, stream),
                        AssetFolder = AssetFolder,
                        Overwrite = Overwrite,
                        PublicId = PublicId,
                        UseFilename = UseFilename
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            return uploadResult;
        }

    }
}