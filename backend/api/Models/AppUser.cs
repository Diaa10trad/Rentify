using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Service;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public List<Favorite> Favorites { get; set; } = new List<Favorite>();
        public List<Product> Products { get; set; } = new List<Product>();
        public List<Service> Services { get; set; } = new List<Service>();
        // public ICollection<Product> OwnedProducts { get; set; } = new List<Product>();
        // public ICollection<Service> OwnedServices { get; set; } = new List<Service>();
        //public ICollection<Review> ReviewsReceived { get; set; } = new List<Review>();
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string AvatarPublicId { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
    }
}