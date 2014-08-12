using AbodeWebsite.Models.ViewModels;
using Microsoft.AspNet.SignalR;

namespace AbodeWebsite.Controllers.Helpers
{
    public static class TileItemHelpers
    {
        public static void NotifyTileItemCreated(TileItemViewModel tileItem)
        {
            GlobalHost.ConnectionManager.GetHubContext<HouseHub>().Clients.Group(tileItem.CreatedUser.HouseId).tileItemAdded(tileItem);
        }
    }
}