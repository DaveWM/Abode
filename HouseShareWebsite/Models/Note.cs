using System;

namespace AbodeWebsite.Models
{
    public class Note : TileItem
    {
        public decimal Importance { get; set; }
        public override decimal Priority
        {
            get
            {
                var importanceComponent = Math.Pow((double)Importance,2);
                var dateComponent = Math.Pow(Math.Exp(-1*(DateTime.Now - this.CreatedDate).TotalDays), 2);
                return (decimal)Math.Sqrt(importanceComponent + dateComponent);
            }
        }

        public override bool Hidden
        {
            get { return false; }
        }

        public string Content { get; set; }
    }
}