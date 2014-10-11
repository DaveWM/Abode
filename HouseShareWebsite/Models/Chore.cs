using System;
using AbodeWebsite.Enums;

namespace AbodeWebsite.Models
{
    public class Chore : TileItem
    {
        public DateTime ExpectedCompletionDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public override decimal Priority
        {
            get
            {
                const double expConstant = 0.12; // gives priority after 1 day = 0.88, after 7 days = 0.43 - about right
                return (decimal)Math.Min(1, Math.Exp(-1 * (ExpectedCompletionDate - DateTime.Now).TotalDays) * expConstant);
            }
        }

        public override bool Hidden
        {
            get { return CompletedDate != null; }
        }

        public string Description { get; set; }

        public ChoreType ChoreType { get; set; }
    }
}