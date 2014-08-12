using System.Collections.Generic;

namespace AbodeWebsite.Models.ViewModels
{
    public class HouseViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public List<UserViewModel> Users { get; set; } 
    }
}