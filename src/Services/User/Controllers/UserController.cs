using System.Text.Json.Nodes;
using Dapr;
using Dapr.Client;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }
        
        [Topic("pubsub", "newScan")]
        [HttpPost("/scans")]
        public async Task<ActionResult> NewScan(Scan scan) // ONLY FOR PROJECT SKELETON EXPERIMENT, REMOVE / REPLACE LATER
        {
            Console.WriteLine($"Received message: {scan.id}");
            return Ok();
        }
    }
}