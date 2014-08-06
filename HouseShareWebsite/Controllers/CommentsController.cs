using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using HouseShareWebsite.Controllers.Helpers;
using HouseShareWebsite.Models;
using HouseShareWebsite.Models.ViewModels;
using Microsoft.AspNet.SignalR;

namespace HouseShareWebsite.Controllers
{
    [RoutePrefix("api/comments")]
    public class CommentsController : ApiController
    {
        [HttpGet]
        [Route("GetItemComments")]
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
        public CommentViewModel PostComment(CommentViewModel toPost)
        {
            using (var db = new EntityModel())
            {
                var user = UserHelpers.GetCurrentUser(db);
                var newComment = db.Comments.Create();
                newComment.TileItemId = toPost.TileItemId;
                newComment.Text = toPost.Text;
                newComment.UserId = user.Id;
                newComment.CreatedDate = DateTime.Now;
                db.Comments.Add(newComment);
                db.SaveChanges();
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