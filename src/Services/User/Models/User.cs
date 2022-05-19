using System.ComponentModel.DataAnnotations;

namespace User
{
    public class User
    {
        [Key]
        public string id { get; set; }
        [EmailAddress]
        public string email { get; set; }
        public bool admin { get; set; }
    }
}