using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(HouseShareWebsite.Startup))]

namespace HouseShareWebsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
