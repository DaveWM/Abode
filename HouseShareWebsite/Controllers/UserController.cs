using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AbodeWebsite.Controllers.Helpers;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;
using AutoMapper;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using WebGrease.Css.Extensions;

namespace AbodeWebsite.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private CloudBlobContainer _profilePicsContainer;

        public UserController()
        {
            var cloudStorageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings.Get("AzureStorageConnectionString"));
            var blobClient = cloudStorageAccount.CreateCloudBlobClient();
            _profilePicsContainer = blobClient.GetContainerReference(Constants.AzureProfilePicsContainer);
        }

        [HttpPost]
        [Route("UploadProfilePicture")]
        public async Task<HttpResponseMessage> UploadProfilePicture()
        {
            var streamProvider = await Request.Content.ReadAsMultipartAsync();
            var file = streamProvider.Contents.FirstOrDefault();

            var blobName = string.Format("{0}_{1}", UserHelpers.GetCurrentUser().Id, DateTime.Now.Ticks);
            var blob = _profilePicsContainer.GetBlockBlobReference(blobName);
            blob.UploadFromStream(await file.ReadAsStreamAsync());

            return Request.CreateResponse(HttpStatusCode.OK, blob.Uri.AbsoluteUri);
        }

        [HttpGet]
        [Route("GetUser")]
        public UserViewModel GetUser(string userId)
        {
            using (var db = new EntityModel())
            {
                var user = db.Users.FirstOrDefault(u => u.Id == userId);
                UserHelpers.VerifyViewableUser(user);

                return Mapper.Map<ApplicationUser, UserViewModel>(user);
            }
        }

        [HttpGet]
        [Route("GetHousemates")]
        public List<UserViewModel> GetHousemates(int houseId)
        {
            using (var db = new EntityModel())
            {
                if (houseId != UserHelpers.GetCurrentUser().HouseId)
                {
                    throw new HttpResponseException(HttpStatusCode.Unauthorized);
                }
                return Mapper.Map<ICollection<ApplicationUser>, List<UserViewModel>>(db.Houses.FirstOrDefault(h => h.Id == houseId).Users);
            }
        }

        [HttpPost]
        [Route("UpdateUser")]
        public IHttpActionResult UpdateUser(UserViewModel user)
        {
            using (var db = new EntityModel())
            {
                var existingUser = db.Users.FirstOrDefault(u => u.Id == user.Id);
                UserHelpers.VerifyViewableUser(existingUser);

                existingUser.RealName = user.RealName;
                existingUser.PhoneNumber = user.PhoneNumber;

                existingUser.ProfilePictureUrl = user.ProfilePictureUrl;
                _profilePicsContainer.ListBlobs(existingUser.Id).Cast<CloudBlockBlob>()
                    .ForEach(b =>
                             {
                                 if (b.Uri.AbsoluteUri != existingUser.ProfilePictureUrl)
                                 {
                                     b.DeleteAsync();
                                 }
                             });

                db.SaveChanges();
                return Ok();
            }
        }
    }
}