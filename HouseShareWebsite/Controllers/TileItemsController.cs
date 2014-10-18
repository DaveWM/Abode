using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AbodeWebsite.Controllers.Helpers;
using AutoMapper;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;
using Microsoft.AspNet.SignalR;

namespace AbodeWebsite.Controllers
{
    [RoutePrefix("api/items")]
    public class TileItemsController : ApiController
    {
        [HttpGet]
        [Route("")]
        public List<TileItemViewModel> GetWhiteboardTileItems()
        {
            using (var db = new EntityModel())
            {
                var user = db.Users.FirstOrDefault(u => u.UserName == this.User.Identity.Name);
                if (user == null)
                    throw new Exception("Could not find current user.");
                // return unordered results, order in front end
                var results =
                    db.TileItems.Include("Comments")
                    .Where(ti => ti.CreatedUser.HouseId == user.HouseId)
                        .ToList()
                        .Where(ti => !ti.Hidden)
                        .Select(Mapper.Map<TileItem, TileItemViewModel>).ToList();
                return results;
            }
        }

        [HttpGet]
        [Route("{tileItemId:int}")]
        public TileItemViewModel GetTileItem(int tileItemId)
        {
            using (var db = new EntityModel())
            {
                var tileItem = db.TileItems.Include("CreatedUser").FirstOrDefault(i => i.Id == tileItemId);
                return Mapper.Map<TileItem, TileItemViewModel>(tileItem);
            }
        }

        [HttpGet]
        [Route("types")]
        public List<TileItemType> GetTileItemTypes()
        {
            return Enum.GetValues(typeof (TileItemType)).Cast<TileItemType>().ToList();
        }

        [HttpGet]
        [Route("{tileItemId:int}/comments")]
        public List<CommentViewModel> GetItemComments(int tileItemId)
        {
            using (var db = new EntityModel())
            {
                return
                    db.Comments.Include("User").Where(c => c.TileItemId == tileItemId)
                        .ToList()
                        .Select(Mapper.Map<Comment, CommentViewModel>)
                        .ToList();
            }
        }

        [HttpPost]
        [Route("{tileItemId:int}/comments")]
        public CommentViewModel PostComment([FromBody]dynamic request, [FromUri]int tileItemId)
        {
            string comment = request.content;
            if (String.IsNullOrWhiteSpace(comment))
            {
                throw new Exception("Comment must not be empty");
            }
            using (var db = new EntityModel())
            {
                var user = UserHelpers.GetCurrentUser();
                var newComment = db.Comments.Create();
                newComment.TileItemId = tileItemId;
                newComment.Text = comment;
                newComment.UserId = user.Id;
                newComment.CreatedDate = DateTime.Now;
                db.Comments.Add(newComment);
                db.SaveChanges();
                db.Entry(newComment).Reference(c => c.User).Load();
                var result = Mapper.Map<Comment, CommentViewModel>(newComment);
                NotifyAllCommentAdded(result, user.HouseId.Value);
                return result;
            }
        }

        private void NotifyAllCommentAdded(CommentViewModel comment, int houseId)
        {
            GlobalHost.ConnectionManager.GetHubContext<HouseHub>().Clients.Group(houseId.ToString()).commentAdded(comment);
        }
    }
}