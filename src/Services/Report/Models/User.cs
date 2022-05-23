using System.ComponentModel.DataAnnotations;

namespace Report;

public class User
{
    [Key]
    public string id { get; set; }
    [EmailAddress]
    public string email { get; set; }
}