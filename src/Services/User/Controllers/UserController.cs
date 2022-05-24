using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Nodes;
using Dapr;
using Dapr.Client;
using Microsoft.AspNetCore.Mvc;
using User.Data;

namespace User.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserContext _context;

        public UserController(ILogger<UserController> logger, UserContext context)
        {
            _logger = logger;
            _context = context;
            _context.Database.EnsureCreated(); 
        }
        
        [Topic("pubsub", "newScan")]
        [HttpPost("/scans")]
        public async Task<ActionResult> NewScan(Scan scan) // ONLY FOR PROJECT SKELETON EXPERIMENT, REMOVE / REPLACE LATER
        {
            Console.WriteLine($"Received message: {scan.id}");
            return Ok();
        }
        
        [HttpPost("authenticated/add")]
        public async Task<ActionResult> NewUser()
        {
            if (Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                var jwt = authHeader.ToString().Split(" ")[1];
                var handler = new JwtSecurityTokenHandler();
                var claims = handler.ReadJwtToken(jwt).Claims;
                string user_id = claims.First(claim => claim.Type == "user_id").Value;
                string email = claims.First(claim => claim.Type == "email").Value;
                User user = new User();
                user.id = user_id;
                user.email = email;
                user.admin = false;
                
                _context.users.Add(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest("No Authorization header provided");
            }
        }
        
        [HttpGet("authenticated/me")]
        public async Task<ActionResult<User>> GetMe()
        {
            Request.Headers.TryGetValue("Authorization", out var authHeader);
            var jwt = authHeader.ToString().Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwt).Claims;
            string user_id = claims.First(claim => claim.Type == "user_id").Value;

            User user = await _context.users.FindAsync(user_id);
           
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("authenticated/admin/{email}")]
        public async Task<ActionResult> MakeAdmin([FromRoute] string email)
        {
            if (IsAdmin(Request))
            {
                var user = _context.users.FirstOrDefault(u => u.email == email);
                if (user == null)
                {
                    return NotFound();
                }
                user.admin = true;
                _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return Unauthorized("User is not admin");
            }
        }

        private bool IsAdmin(HttpRequest request)
        {
            request.Headers.TryGetValue("Authorization", out var authHeader);
            var jwt = authHeader.ToString().Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwt).Claims;
            string user_id = claims.First(claim => claim.Type == "user_id").Value;
            User user = _context.users.FirstOrDefault(u => u.id == user_id);
            return user.admin;
        }
    }
}