using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AbodeWebsite.Models.ViewModels
{
    public enum TileItemType
    {
        Note = 1
    }
    public abstract class TileItemViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public UserViewModel CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Priority { get; set; }
        public List<CommentViewModel> Comments { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public TileItemType TileItemType { get; set; }
    }
}