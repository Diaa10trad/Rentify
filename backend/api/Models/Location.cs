using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Location
    {
        public int Id { get; set;}
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal Longitude { get; set; }
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal Latitude { get; set; }
    }
}