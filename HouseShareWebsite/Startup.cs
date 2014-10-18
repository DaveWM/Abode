using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AbodeWebsite.Startup))]

namespace AbodeWebsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR("/api/signalr", new HubConfiguration()
                           {
                               EnableJSONP = true
                           });
        }
    }
}
