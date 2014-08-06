using System.Web.Mvc;
using System.Web.Routing;

namespace HouseShareWebsite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("Token");

            routes.MapRoute("API", "api/{controller}/{action}/{id}",
                new {controller = "App", action = "Index", id = UrlParameter.Optional});
            routes.MapRoute(
                name: "Client URLs",
                url: "{*url}",
                defaults: new { controller = "App", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute("auth", "token");
        }
    }
}
