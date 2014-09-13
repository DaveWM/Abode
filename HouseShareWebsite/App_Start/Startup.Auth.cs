using System;
using System.Threading.Tasks;
using System.Web.Cors;
using AbodeWebsite.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using AbodeWebsite.Providers;

namespace AbodeWebsite
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(EntityModel.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(30),
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);
            app.SetDefaultSignInAsAuthenticationType(DefaultAuthenticationTypes.ExternalCookie);


            // Uncomment the following lines to enable logging in with third party login providers
            app.UseMicrosoftAccountAuthentication(
                clientId: "000000004012ABA5",
                clientSecret: "9KHkk7OfuYwr06NpsaBKEZxD0wfQZgE2");

            app.UseTwitterAuthentication(
                consumerKey: "QUEcMqpTwUN01DpEz2uMwTAYN",
                consumerSecret: "6DFMM6HQQnEG8qleTqDOvdLm6ejbrnvB0nmGy595JaMaDx7pwe");

            app.UseFacebookAuthentication(
                appId: "775625759162004",
                appSecret: "d411869c0707a273d6530a6a9cc592f7");

            app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = "469646760415-qfrnioi99r3bmcfpsi7997m1h6qgj0b3.apps.googleusercontent.com",
                ClientSecret = "9YdAukql7ZKrm6RUI4hfXA7S"
            });
        }
    }
}
