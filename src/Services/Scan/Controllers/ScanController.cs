using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Dapr.Client;
using Microsoft.AspNetCore.Mvc;
using Scan.Data;

namespace Scan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScanController : ControllerBase
    {
        private readonly ILogger<ScanController> _logger;
        private readonly ScanContext _context;
        private DaprClient _dapr;

        public ScanController(ILogger<ScanController> logger, ScanContext context)
        {
            _logger = logger;
            _context = context;
            _context.Database.EnsureCreated(); 
            _dapr = new DaprClientBuilder().Build();
        }

        [HttpPost("add")]
        public async Task<ObjectResult> PostScan(Scan scan)
        {
            // USING THE RETURNED SCAN ID, WE CAN POLL ON FRONTEND FOR REPORTS WITH THAT SCAN ID
            if (!scan.rescan)
            {
                // Look for a report in last 24 hours if one exists first
                DateTime _24HoursAgo = DateTime.Now.AddHours(-24);
                var latestScan24Hours = _context.scans.Where(s => s.url == scan.url && s.date >= _24HoursAgo).OrderByDescending(s => s.date).FirstOrDefault();
                if (latestScan24Hours != null)
                {
                    return Ok(latestScan24Hours.id);
                }
                else
                {
                    return await SaveAndPublish(scan, getAuthentication(Request));
                }
            }
            else
            {
                var latestScan = _context.scans.Where(s => s.url == scan.url).OrderByDescending(s => s.date).FirstOrDefault();
                if (latestScan != null)
                {
                    if (latestScan.date.AddMinutes(5) < DateTime.Now)
                    {
                        return await SaveAndPublish(scan, getAuthentication(Request));
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status429TooManyRequests, "Please wait at least 5 minutes for a forced rescan");
                    }
                } 
                else
                {
                    return await SaveAndPublish(scan, getAuthentication(Request));
                }
            }
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

        [HttpGet("all")]
        public async Task<ActionResult<List<Scan>>> GetAllScans()
        {
            return _context.scans.ToList();
        }

        private async Task<ObjectResult> SaveAndPublish(Scan scan, User? user)
        {
            if (user != null)
            {
                scan.createdBy = user;
            }
            _context.scans.Add(scan);
            await _context.SaveChangesAsync();

            await _dapr.PublishEventAsync("pubsub", "newScan", scan);
            Console.WriteLine($"Published scan: {scan.id}");
            
            return Ok(scan.id);
        }

        private User? getAuthentication(HttpRequest request)
        {
            if (request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                var jwt = authHeader.ToString().Split(" ")[1];
                var handler = new JwtSecurityTokenHandler();
                var claims = handler.ReadJwtToken(jwt).Claims;
                string user_id = claims.First(claim => claim.Type == "user_id").Value;
                string email = claims.First(claim => claim.Type == "email").Value;
                User user = new User();
                user.id = user_id;
                user.email = email;
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}