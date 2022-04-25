using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scan
{
    public class Scan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? id { get; set; }
        public DateTime date { get; set; }
        [Url]
        public string url { get; set; }
        public string? data { get; set; }
        public bool hidden { get; set; }

        public Scan(string? id, DateTime date, string url, string? data, bool hidden) {
            this.id = id;
            this.date = date;
            this.url = url;
            this.data = data;
            this.hidden = hidden;
        }
    }
}