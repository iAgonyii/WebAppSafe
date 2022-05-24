using Dapr;
using Microsoft.EntityFrameworkCore;
using User.Data;

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

builder.Services.AddDbContext<UserContext>(options =>
    options.UseCosmos(endpoint, key, "user-state"));

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

app.UseAuthorization();

app.MapControllers();

app.Run();
