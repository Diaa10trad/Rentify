using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Threading.Tasks;
using System.Collections.Generic;

public class CategoriesDictionaryModelBinder : IModelBinder
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
            if (key.StartsWith("Category", StringComparison.OrdinalIgnoreCase))
            {
                result[key] = bindingContext.HttpContext.Request.Query[key];
            }
        }

        bindingContext.Result = ModelBindingResult.Success(result);
        return Task.CompletedTask;
    }
}
