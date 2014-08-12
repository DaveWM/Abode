using System;
using System.Linq;
using System.Web;
using AbodeWebsite.Models;

namespace AbodeWebsite.Controllers.Helpers
{
    public static class UserHelpers
    {
        public static ApplicationUser GetCurrentUser(EntityModel db)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == HttpContext.Current.User.Identity.Name);
            if (user == null)
                throw new Exception("Could not find current user.");
            return user;
        }
    }
}