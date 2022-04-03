using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace User
{
    public class Scan
    {
        public string id { get; set; }
        public DateTime date { get; set; }
        public string? data { get; set; }

        public Scan(string id, DateTime date, string? data) {
            this.id = id;
            this.date = date;
            this.data = data;
        }
    }
}