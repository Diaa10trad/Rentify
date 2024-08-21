using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Review
{
    public class ReviewCreateDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}