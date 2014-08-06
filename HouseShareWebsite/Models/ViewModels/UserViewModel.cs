using System.Collections.Generic;

namespace HouseShareWebsite.Models.ViewModels
{
    public class UserViewModel
    {
        public string Email { get; set; }
        public string RealName { get; set; }
        public string HouseId { get; set; }
        public List<CommentViewModel> Comments { get; set; } 
    }
}