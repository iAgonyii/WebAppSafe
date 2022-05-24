using Microsoft.EntityFrameworkCore;
using Report.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin();
        });
});

builder.Services.AddControllers().AddDapr();

string endpoint = "https://webappsafe.documents.azure.com:443/";
string key = Environment.GetEnvironmentVariable("COSMOS_DB_MASTER_KEY");

builder.Services.AddDbContext<ReportContext>(options =>
    options.UseCosmos(endpoint, key, "report-state"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCloudEvents();
app.MapControllers();
app.MapSubscribeHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();