using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;

namespace AbodeWebsite.Controllers
{
    public class TileItemsController : ApiController
    {
        [HttpGet]
        public List<TileItemViewModel> GetWhiteboardTileItems()
        {
            using (var db = new EntityModel())
            {
                var user = db.Users.FirstOrDefault(u => u.UserName == this.User.Identity.Name);
                if (user == null)
                    throw new Exception("Could not find current user.");
                return
                    db.TileItems.Include("Comments")
                    .Where(ti => ti.CreatedUser.HouseId == user.HouseId)
                    .OrderByDescending(ti => ti.CreatedDate)
                        .Take(20)
                        .ToList()
                        .Select(Mapper.Map<TileItem, TileItemViewModel>).ToList();
            }
        }

        [HttpGet]
        public TileItemViewModel GetTileItem(int tileItemId)
        {
            using (var db = new EntityModel())
            {
                var tileItem = db.TileItems.Include("CreatedUser").FirstOrDefault(i => i.Id == tileItemId);
                return Mapper.Map<TileItem, TileItemViewModel>(tileItem);
            }
        }
    }
}