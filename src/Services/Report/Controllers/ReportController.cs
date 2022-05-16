using System.Text.Json.Nodes;
using Dapr;
using Dapr.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Report.Data;

namespace Report.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> _logger;
        private readonly ReportContext _context;

        public ReportController(ILogger<ReportController> logger, ReportContext context)
        {
            _logger = logger;
            _context = context;
            _context.Database.EnsureCreated();
        }
        
        [Topic("pubsub", "resultReport")]
        [HttpPost("add")]
        public async Task<ActionResult> NewReport([FromBody] object reportJson) // ONLY FOR PROJECT SKELETON EXPERIMENT, REMOVE / REPLACE LATER
        {
            JObject json = JObject.Parse(reportJson.ToString());
            Report report = new Report();
            report.scan = Guid.Parse(json["scan"].ToString());
            report.start_date = DateTime.Parse(json["start_date"].ToString());
            report.end_date = DateTime.Parse(json["end_date"].ToString());
            report.url = json["url"].ToString();
            report.hidden = Boolean.Parse(json["hidden"].ToString()); 
            report.rescan = Boolean.Parse(json["rescan"].ToString());
            report.createdBy = json["createdBy"].ToObject<User>();
            report.grade = json["grade"].ToString();
            report.observatory = json["observatory"].ToString();
            
            _context.reports.Add(report);
            await _context.SaveChangesAsync();
            
            Console.WriteLine($"Saved new report for: {report.url} - {report.id}");
            
            return Ok(report.id);
        }
        
        [HttpGet("poll/{scan}")]
        public async Task<ActionResult<Report>> PollReportByScanId(string scan)
        {
            Guid scanGuid = Guid.Parse(scan);
            var report = _context.reports.FirstOrDefault(r => r.scan == scanGuid);

            if (report == null)
            {
                return NoContent();
            }

            return Ok(report.id);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(string id)
        {
            Guid reportGuid = Guid.Parse(id);
            var report = await _context.reports.FindAsync(reportGuid);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }
    }
}