using Google.Type;
using Microsoft.EntityFrameworkCore;
using DateTime = System.DateTime;

namespace Report.Data;

public class ReportContext: DbContext
{
    public ReportContext()
    {
        
    }

    public ReportContext(DbContextOptions<ReportContext> options) :
        base(options)
    {
        
    }
    
    public DbSet<Report>? reports { get; set; }
    
    protected override void OnModelCreating( ModelBuilder builder ) {
        builder.HasDefaultContainer("Reports");
        builder.Entity<Report>().ToContainer("Reports");
    }
}