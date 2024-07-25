using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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

        public string AdditionalInfo { get; set; } = string.Empty;

        [Required]
        public int Refund { get; set;}
        [Required]
        public int PermittedDuration { get; set;}
    }
}