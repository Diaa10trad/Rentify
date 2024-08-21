using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Favorite
    {
        public int FavoriteId { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; } = null!;
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public int? ServiceId { get; set; }
        public Service? Service { get; set; }
        public string ItemType { get; set; } = string.Empty;
    }
}