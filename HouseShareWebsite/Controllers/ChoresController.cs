using System;
using System.Linq;
using System.Web.Http;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;
using AutoMapper;

namespace AbodeWebsite.Controllers
{
    public class ChoresController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Create(ChoreViewModel chore)
        {
            using (var db = new EntityModel())
            {
                var user = db.Users.FirstOrDefault(u => u.UserName == this.User.Identity.Name);
                if (user == null)
                    throw new Exception("Could not find current user.");
                var newChore = db.Chores.Create();
                Mapper.Map(chore, newChore);
                newChore.Title = string.Format("Chore - {0}", newChore.ChoreType);
                newChore.CreatedDate = DateTime.Now;
                newChore.CreatedUserId = user.Id;
                db.Chores.Add(newChore);
                db.SaveChanges();
                return Ok();
            }
        }

        [HttpDelete]
        public IHttpActionResult Complete(int id)
        {
            using (var db = new EntityModel())
            {
                var chore = db.Chores.FirstOrDefault(c => c.Id == id);
                if (chore == null)
                {
                    return BadRequest(string.Format("No chore exists with id {0}", id));
                }
                else if (chore.CompletedDate != null)
                {
                    return BadRequest("The chore has already been completed");
                }
                else
                {
                    chore.CompletedDate = DateTime.Now;
                    db.SaveChanges();
                    return Ok();
                }
            }
        }
    }
}