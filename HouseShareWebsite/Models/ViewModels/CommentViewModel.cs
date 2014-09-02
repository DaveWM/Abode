using System;

namespace AbodeWebsite.Models.ViewModels
{
    public class CommentViewModel
    {
        public string Text { get; set; }
        public string UserId { get; set; }
        public int TileItemId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserName { get; set; }
        public string UserProfilePicUrl { get; set; }
        public string TileItemTitle { get; set; }
    }
}