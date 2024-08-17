using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ServiceImage;

namespace api.Dtos.Service
{
    public class ServiceUpdateDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string AdditionalInfo { get; set; }
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal Longitude { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal Latitude { get; set; }

        [Required]
        [Range(0, 100)]
        public int Refund { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int PermittedDuration { get; set; }

        public List<IFormFile>? NewImages { get; set; }

        public List<string>? DeletedImages { get; set; }
    }
}