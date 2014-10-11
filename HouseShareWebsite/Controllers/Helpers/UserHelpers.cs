using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using AbodeWebsite.Models;

namespace AbodeWebsite.Controllers.Helpers
{
    public static class UserHelpers
    {
        public static UserClaimsDetails GetCurrentUser()
        {
            var cp = HttpContext.Current.User as ClaimsPrincipal;
            var appUser = new UserClaimsDetails { Id = cp.Claims.FirstOrDefault(c => c.Type == Constants.IdClaim).Value };

            var houseClaim = cp.Claims.FirstOrDefault(c => c.Type == Constants.HouseClaim);
            if (houseClaim != null)
            {
                appUser.HouseId = int.Parse(houseClaim.Value);
            }
            return appUser;
        }

        // check if the currently logged in user can view another user (can only view user in same house)
        public static void VerifyViewableUser(ApplicationUser user)
        {
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            else if (user.HouseId != UserHelpers.GetCurrentUser().HouseId) // not in same house as current user
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
        }

        public class UserClaimsDetails
        {
            public string Id { get; set; }
            public int? HouseId { get; set; }
        }
    }
}