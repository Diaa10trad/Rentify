using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CancellationPolicy
    {
        public int Id { get; set;}
        
        [Range(0, 100)]
        public int Refund { get; set; }
        
        [Range(0, int.MaxValue)]
        public int PermittedDuration { get; set; } 
    }
}