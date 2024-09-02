using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Favorite;
using api.Dtos.Product;
using api.Dtos.Service;

namespace api.Dtos.AppUser
{
    public class AppUserSpecificDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;

        public ICollection<ProductDTO>? Products { get; set; }
        public ICollection<ServiceDto>? Services { get; set; }
        public ICollection<FavoriteDto>? Favorites { get; set; }
    }
}