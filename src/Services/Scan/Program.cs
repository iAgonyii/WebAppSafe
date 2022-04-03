using Microsoft.EntityFrameworkCore;
using Scan.Data;

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
builder.Services.AddControllers();

string endpoint = "https://webappsafe.documents.azure.com:443/";
string key = Environment.GetEnvironmentVariable("COSMOS_DB_MASTER_KEY");

builder.Services.AddDbContext<ScanContext>(options =>
    options.UseCosmos(endpoint, key, "scan-state"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
