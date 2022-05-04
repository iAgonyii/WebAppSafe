

namespace Report;

public interface IReport
{

    public Guid id { get; set; }
    public Guid scan { get; set; }
    public DateTime start_date { get; set; }
    public DateTime end_date { get; set; }
    public string url { get; set; }
    public bool hidden { get; set; }
    public bool rescan { get; set; }
    public string observatory { get; set; }
}