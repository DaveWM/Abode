namespace HouseShareWebsite.Models
{
    public class Note : TileItem
    {

        public decimal Importance { get; set; }
        public override decimal Priority
        {
            get { return Importance; }
        }

        public string Content { get; set; }
    }
}