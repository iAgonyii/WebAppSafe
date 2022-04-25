using Google.Type;
using Microsoft.EntityFrameworkCore;
using DateTime = System.DateTime;

namespace Scan.Data;

public class ScanContext: DbContext
{
    public ScanContext()
    {
        
    }

    public ScanContext(DbContextOptions<ScanContext> options) :
        base(options)
    {
        
    }
    
    public DbSet<Scan>? scans { get; set; }
    
    protected override void OnModelCreating( ModelBuilder builder ) {
        builder.HasDefaultContainer("Scans");
        builder.Entity<Scan>().ToContainer("Scans");
    }
}