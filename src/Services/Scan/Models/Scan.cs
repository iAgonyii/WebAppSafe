namespace Scan
{
    public class Scan
    {
        public long id { get; set; }
        public DateTime date { get; set; }
        public string? data { get; set; }

        public Scan(long id, DateTime date, string? data) {
            this.id = id;
            this.date = date;
            this.data = data;
        }
    }
}