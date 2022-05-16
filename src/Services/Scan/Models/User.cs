using System.ComponentModel.DataAnnotations;

namespace Scan;

public class User
{
    [Key]
    public string id { get; set; }
    [EmailAddress]
    public string email { get; set; }
}