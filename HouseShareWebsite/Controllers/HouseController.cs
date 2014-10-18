using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using AutoMapper;
using AbodeWebsite.Controllers.Helpers;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;

namespace AbodeWebsite.Controllers
{
    [System.Web.Http.RoutePrefix("api/houses")]
    public class HouseController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("")]
        public HouseViewModel CreateHouse(HouseViewModel house)
        {
            using (var db = new EntityModel())
            {
                var user = UserHelpers.GetCurrentUser();
                var appUser = db.Users.FirstOrDefault(u => u.Id == user.Id);
                var newHouse = db.Houses.Create();
                Mapper.Map(house, newHouse);
                appUser.House = newHouse;
                db.SaveChanges();
                return Mapper.Map<House,HouseViewModel>(newHouse);
            }
        }

        // gets house for current user if no id supplied
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("{houseId:int}")]
        public HouseViewModel GetHouse(int houseId)
        {
            if (houseId <= 0)
            {
                var userHouseId = UserHelpers.GetCurrentUser().HouseId;
                if (userHouseId == null)
                {
                    return null;
                }
                else houseId = userHouseId.Value;
            }
            using (var db = new EntityModel())
            {
                var house = db.Houses.FirstOrDefault(h => h.Id == houseId);
                if(house == null)
                    throw new HttpResponseException(HttpStatusCode.BadRequest);

                return Mapper.Map<House, HouseViewModel>(house);
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("{houseId:int}/Join")]
        public HouseViewModel JoinHouse(int houseId, [FromBody]string password)
        {
            using (var db = new EntityModel())
            {
                var house = db.Houses.FirstOrDefault(h => h.Id == houseId);
                if(house == null)
                    throw new Exception("There is no house with Id " + houseId);
                if (password != house.Password)
                {
                    throw new HttpResponseException(this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Incorrect Password"));
                }

                var user = UserHelpers.GetCurrentUser();
                var appUser = db.Users.FirstOrDefault(u => u.Id == user.Id);
                appUser.HouseId = houseId;
                db.SaveChanges();
                return Mapper.Map<House, HouseViewModel>(appUser.House);
            }
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("")]
        public List<HouseViewModel> Search(string searchString)
        {
            using (var db = new EntityModel())
            {
                var results = db.Houses.Include("Users").Include("Users.Comments").Where(h => h.Name.ToLower().Contains(searchString.ToLower())).Take(20).ToList();
                return results.Select(Mapper.Map<House, HouseViewModel>).ToList();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("{houseId:int}/housemates")]
        public List<UserViewModel> GetHousemates(int houseId)
        {
            using (var db = new EntityModel())
            {
                if (houseId != UserHelpers.GetCurrentUser().HouseId)
                {
                    // throw this for now, might want to allow in future
                    throw new HttpResponseException(HttpStatusCode.Unauthorized);
                }
                return Mapper.Map<ICollection<ApplicationUser>, List<UserViewModel>>(db.Houses.FirstOrDefault(h => h.Id == houseId).Users);
            }
        }
    }
}