using System;
using System.Linq;
using System.Threading.Tasks;
using HouseShareWebsite.Models;
using Microsoft.AspNet.SignalR;

namespace HouseShareWebsite
{
    [HubAuthorize]
    public class HouseHub : Hub
    {
        // can't do this in connect method because reasons
        public void JoinHouseGroup()
        {
            Groups.Add(this.Context.ConnectionId, HouseId.ToString());
        }

        private int HouseId
        {
            get
            {
                using (var db = new EntityModel())
                {
                    var user = db.Users.FirstOrDefault(u => u.UserName == this.Context.User.Identity.Name);
                    if (user == null)
                        throw new Exception("No User found");
                    return user.HouseId.Value;
                }
            }
        }
    }
}