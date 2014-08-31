using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using AutoMapper;
using AbodeWebsite.Controllers.Helpers;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;

namespace AbodeWebsite.Controllers
{
    [RoutePrefix("api/house")]
    public class HouseController : ApiController
    {
        [HttpPost]
        [Route("CreateHouse")]
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

        [HttpGet]
        [Route("GetCurrentHouse")]
        public HouseViewModel GetCurrentHouse()
        {
            using (var db = new EntityModel())
            {
                var user = UserHelpers.GetCurrentUser();
                var appUser = db.Users.FirstOrDefault(u => u.Id == user.Id);
                return Mapper.Map<House, HouseViewModel>(appUser.House);
            }
        }

        [HttpGet]
        [Route("GetHouse")]
        public HouseViewModel GetHouse(int houseId)
        {
            using (var db = new EntityModel())
            {
                var house = db.Houses.FirstOrDefault(h => h.Id == houseId);
                if(house == null)
                    throw new HttpResponseException(HttpStatusCode.BadRequest);

                return Mapper.Map<House, HouseViewModel>(house);
            }
        }

        [HttpPost]
        [Route("JoinHouse")]
        public HouseViewModel JoinHouse(HouseViewModel toJoin)
        {
            using (var db = new EntityModel())
            {
                var house = db.Houses.FirstOrDefault(h => h.Id == toJoin.Id);
                if(house == null)
                    throw new Exception("There is no house with Id " + toJoin.Id);
                if (toJoin.Password != house.Password)
                {
                    return null;
                }

                var user = UserHelpers.GetCurrentUser();
                var appUser = db.Users.FirstOrDefault(u => u.Id == user.Id);
                appUser.HouseId = toJoin.Id;
                db.SaveChanges();
                return Mapper.Map<House, HouseViewModel>(appUser.House);
            }
        }

        [HttpGet]
        [Route("Search")]
        public List<HouseViewModel> Search(string searchString)
        {
            using (var db = new EntityModel())
            {
                var results = db.Houses.Include("Users").Include("Users.Comments").Where(h => h.Name.ToLower().Contains(searchString.ToLower())).Take(20).ToList();
                return results.Select(Mapper.Map<House, HouseViewModel>).ToList();
            }
        }
    }
}