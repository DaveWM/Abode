using System.Web.Mvc;
using System.Web.Routing;

namespace AbodeWebsite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("Token");

            routes.IgnoreRoute("api/{*url}");
            routes.MapRoute(
                name: "Client URLs",
                url: "{*url}",
                defaults: new { controller = "App", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
