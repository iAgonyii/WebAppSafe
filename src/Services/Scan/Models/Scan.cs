using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scan
{
    public class Scan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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