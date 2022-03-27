using Microsoft.AspNetCore.Mvc;

namespace Scan.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScanController : ControllerBase
    {
        private readonly ILogger<ScanController> _logger;

        public ScanController(ILogger<ScanController> logger)
        {
            _logger = logger;
        }
    }
}