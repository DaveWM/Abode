using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace AbodeWebsite.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            userIdentity.AddClaim(new Claim(Constants.IdClaim, this.Id));
            if (this.HouseId != null)
            {
                userIdentity.AddClaim(new Claim(Constants.HouseClaim, this.HouseId.Value.ToString()));
            }
            return userIdentity;
        }

        public string RealName { get; set; }
        public int? HouseId { get; set; }
        public virtual House House { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public string ProfilePictureUrl { get; set; }
    }
}