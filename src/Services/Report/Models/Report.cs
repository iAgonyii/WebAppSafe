using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Report;

public class Report : IReport
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid id { get; set; }
    public Guid scan { get; set; }
    public DateTime start_date { get; set; }
    public DateTime end_date { get; set; }
    [Url]
    public string url { get; set; }
    public bool hidden { get; set; }
    public bool rescan { get; set; }
    public string grade { get; set; }
    public string observatory { get; set; }
}