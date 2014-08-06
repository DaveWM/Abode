using System.Web.Http.Filters;
using System.Web.Http;
using HouseShareWebsite.Attributes;

namespace HouseShareWebsite
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
