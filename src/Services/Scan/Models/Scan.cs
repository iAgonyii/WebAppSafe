using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scan
{
    public class Scan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }
        public DateTime date { get; set; }
        [Url]
        public string url { get; set; }
        public string? data { get; set; }
        public bool hidden { get; set; }
        public bool rescan { get; set; }
        public User? createdBy { get; set; }
    }
}