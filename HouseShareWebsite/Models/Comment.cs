using System;

namespace AbodeWebsite.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int TileItemId { get; set; }
        public virtual TileItem TileItem { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}