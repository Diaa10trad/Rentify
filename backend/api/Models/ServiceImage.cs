using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ServiceImage
    {

        [Key]
        public string PublicId { get; set; }
        public int ServiceId { get; set; }
        public string ImageUrl { get; set; }

    }
}