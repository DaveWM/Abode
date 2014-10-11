using System;
using AbodeWebsite.Enums;

namespace AbodeWebsite.Models.ViewModels
{
    public class ChoreViewModel : TileItemViewModel
    {
        public DateTime ExpectedCompletionDate { get; set; }

        public bool Complete { get; set; }

        public string Description { get; set; }

        public ChoreType ChoreType { get; set; }
    }
}