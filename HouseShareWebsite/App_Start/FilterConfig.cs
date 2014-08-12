using System.Web.Http.Filters;
using System.Web.Http;
using AbodeWebsite.Attributes;

namespace AbodeWebsite
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(HttpFilterCollection filters)
        {
            filters.Add(new HandleErrorJsonAttribute());
            filters.Add(new AuthorizeAttribute());
        }
    }
}
