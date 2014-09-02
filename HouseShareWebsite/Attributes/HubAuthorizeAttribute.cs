using System.Security.Claims;
using System.Web.Http.Cors;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Owin;

namespace AbodeWebsite.Attributes
{
    [EnableCors("*", "*", "*")]
    public class HubAuthorizeAttribute : AuthorizeAttribute
    {
        public override bool AuthorizeHubConnection(HubDescriptor hubDescriptor, IRequest request)
        {
            // authenticate by using bearer token in query string
            var token = request.QueryString.Get("token");
            var ticket = Startup.OAuthOptions.AccessTokenFormat.Unprotect(token);
            if (ticket != null && ticket.Identity != null && ticket.Identity.IsAuthenticated && ticket.Identity.HasClaim(c => c.Type == Constants.HouseClaim))
            {
                // set the authenticated user principal into environment so that it can be used in the future
                request.Environment["server.User"] = new ClaimsPrincipal(ticket.Identity);
                return true;
            }
            else
            {
                return false;
            }
        }

        public override bool AuthorizeHubMethodInvocation(IHubIncomingInvokerContext hubIncomingInvokerContext,
            bool appliesToMethod)
        {
            var connectionId = hubIncomingInvokerContext.Hub.Context.ConnectionId;
            // check the authenticated user principal from environment
            var environment = hubIncomingInvokerContext.Hub.Context.Request.Environment;
            var principal = environment["server.User"] as ClaimsPrincipal;
            if (principal != null && principal.Identity.IsAuthenticated)
            {
                // create a new HubCallerContext instance with the principal generated from token
                // and replace the current context so that in hubs we can retrieve current user identity
                hubIncomingInvokerContext.Hub.Context = new HubCallerContext(new ServerRequest(environment),
                    connectionId);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}