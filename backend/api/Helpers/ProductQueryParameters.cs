using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Helpers
{
    public class ProductQueryParameters
    {

        public int PageNumber { get; set; }
        public string Query { get; set; } = string.Empty;
        public decimal? PriceDailyFrom { get; set; }
        public decimal? PriceDailyTo { get; set; }
        public decimal? PriceWeeklyFrom { get; set; }
        public decimal? PriceWeeklyTo { get; set; }
        public decimal? PriceMonthlyFrom { get; set; }
        public decimal? PriceMonthlyTo { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        [ModelBinder(BinderType = typeof(ProductConditionsDictionaryModelBinder))]
        public Dictionary<string, string> ProductConditions { get; set; } = new();

        [ModelBinder(BinderType = typeof(CategoriesDictionaryModelBinder))]
        public Dictionary<string, string> Categories { get; set; } = new();
        public double? Distance { get; set; }
        public int? Quantity { get; set; }

    }
}