using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Product
{
    public class ProductReviewDto
    {
        public int ProductId { get; set; }
        public required string OwnerId { get; set; }
        public string Title { get; set; }

    }
}