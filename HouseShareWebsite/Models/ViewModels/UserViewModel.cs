using System.Collections.Generic;

namespace AbodeWebsite.Models.ViewModels
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string RealName { get; set; }
        public string HouseId { get; set; }
        public string PhoneNumber { get; set; }
        public string ProfilePictureUrl { get; set; }
    }
}