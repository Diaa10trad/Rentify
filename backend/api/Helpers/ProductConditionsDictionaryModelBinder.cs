using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace api.Helpers
{
    public class ProductConditionsDictionaryModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }

            var result = new Dictionary<string, string>();

            foreach (var key in bindingContext.HttpContext.Request.Query.Keys)
            {
                if (key.StartsWith("ProductCondition", StringComparison.OrdinalIgnoreCase))
                {
                    result[key] = bindingContext.HttpContext.Request.Query[key];
                }
            }

            bindingContext.Result = ModelBindingResult.Success(result);
            return Task.CompletedTask;

        }
    }
}