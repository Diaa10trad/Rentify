using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Helpers
{
    public class ServiceQueryParameters
    {
        public int PageNumber { get; set; }
        public string Query { get; set; } = string.Empty;

        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        [ModelBinder(BinderType = typeof(CategoriesDictionaryModelBinder))]
        public Dictionary<string, string> Categories { get; set; } = new();
        public double? Distance { get; set; }

    }
}