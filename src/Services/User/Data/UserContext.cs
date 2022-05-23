using Google.Type;
using Microsoft.EntityFrameworkCore;
using DateTime = System.DateTime;

namespace User.Data;

public class UserContext: DbContext
{
    public UserContext()
    {
        
    }

    public UserContext(DbContextOptions<UserContext> options) :
        base(options)
    {
        
    }
    
    public DbSet<User>? users { get; set; }
    
    protected override void OnModelCreating( ModelBuilder builder ) {
        builder.HasDefaultContainer("Users");
        builder.Entity<User>().ToContainer("Users");
    }
}