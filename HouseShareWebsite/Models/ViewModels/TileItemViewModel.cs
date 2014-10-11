using System;
using System.Collections.Generic;

namespace AbodeWebsite.Models.ViewModels
{
    public enum TileItemType
    {
        Note = 1,
        Chore = 2
    }
    public abstract class TileItemViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public UserViewModel CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Priority { get; set; }
        public List<CommentViewModel> Comments { get; set; }
        public TileItemType TileItemType { get; set; }
        public bool Hidden { get; set; }
    }
}