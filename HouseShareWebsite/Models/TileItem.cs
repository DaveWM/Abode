using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbodeWebsite.Models
{
    public abstract class TileItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CreatedUserId { get; set; }
        public virtual ApplicationUser CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }

        [NotMapped]
        // should have a maximum value of 1
        public abstract decimal Priority { get; }

        [NotMapped]
        // determines if the item shows on the whiteboard
        public abstract bool Hidden { get; }

        public virtual ICollection<Comment> Comments { get; set; } 
    }
}