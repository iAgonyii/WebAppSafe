using Microsoft.AspNetCore.Mvc;
using Scan.Data;

namespace Scan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScanController : ControllerBase
    {
        private readonly ILogger<ScanController> _logger;
        private ScanContext _context;

        public ScanController(ILogger<ScanController> logger, ScanContext context)
        {
            _logger = logger;
            _context = context;
            _context.Database.EnsureCreated();
        }

        List<Scan> MockScans = new List<Scan>()
        {
            new Scan("1", DateTime.Now, "Scan number 1"),
            new Scan("2", DateTime.Now, "Scan number 2"),
            new Scan("3", DateTime.Now, "Scan number 3"),
        };

        [HttpPost]
        public async Task<ActionResult<Scan>> PostScan(Scan scan)
        {
            _context.scans.Add(scan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetScan), new { id = scan.id }, scan);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Scan>> GetScan(string id)
        {
            var scan = await _context.scans.FindAsync(id);

            if (scan == null)
            {
                return NotFound();
            }

            return scan;
        }

        [HttpGet]
        public async Task<ActionResult<List<Scan>>> GetAllScans()
        {
            return _context.scans.ToList();
        }
    }
}