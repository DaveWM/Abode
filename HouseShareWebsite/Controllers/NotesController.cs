using System;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using HouseShareWebsite.Controllers.Helpers;
using HouseShareWebsite.Models;
using HouseShareWebsite.Models.ViewModels;

namespace HouseShareWebsite.Controllers
{
    public class NotesController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CreateNote(NoteViewModel note)
        {
            using (var db = new EntityModel())
            {
                var user = db.Users.FirstOrDefault(u => u.UserName == this.User.Identity.Name);
                if (user == null)
                    throw new Exception("Could not find current user.");
                var noteEntity = db.Notes.Create();
                Mapper.Map(note, noteEntity);
                noteEntity.CreatedUserId = user.Id;
                noteEntity.CreatedDate = DateTime.Now;
                db.Notes.Add(noteEntity);
                db.SaveChanges();
                TileItemHelpers.NotifyTileItemCreated(Mapper.Map<TileItem, TileItemViewModel>(noteEntity));
                return Ok();
            }
        }
    }
}