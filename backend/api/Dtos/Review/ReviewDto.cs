using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Dtos.Product;
using api.Dtos.Service;
using api.Models;

namespace api.Dtos.Review
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }

        public AppUserReviewDto Reviewer { get; set; } = null!;

        public ProductReviewDto? Product { get; set; }

        public ServiceReviewDto? Service { get; set; }

        public int Rating { get; set; }

        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}