using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Dtos.Service;

namespace api.Dtos.Favorite
{
    public class FavoriteDto
    {
        public int FavoriteId { get; set; }
        public string ItemType { get; set; }
        public ProductDTO? product { get; set; }
        public ServiceDto? service { get; set; }
        public int? ProductId { get; set; }
        public int? ServiceId { get; set; }
    }
}