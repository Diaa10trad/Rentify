using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CancellationPolicy
    {
        public int Id { get; set;}
        public decimal Refund { get; set; }
        public int PermittedDuration { get; set; } 
    }
}