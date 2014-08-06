using System.Collections.Generic;

namespace HouseShareWebsite.Models
{
    public class House
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}