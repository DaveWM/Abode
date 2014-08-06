using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HouseShareWebsite.Models.ViewModels;
using Microsoft.AspNet.SignalR;

namespace HouseShareWebsite.Controllers.Helpers
{
    public static class TileItemHelpers
    {
        public static void NotifyTileItemCreated(TileItemViewModel tileItem)
        {
            GlobalHost.ConnectionManager.GetHubContext<HouseHub>().Clients.Group(tileItem.CreatedUser.HouseId).tileItemAdded(tileItem);
        }
    }
}