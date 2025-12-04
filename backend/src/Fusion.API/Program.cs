using Microsoft.EntityFrameworkCore;
using Fusion.API.Data;
using Fusion.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.
// Use SQLite so it works both locally and inside Docker, where the connection
// string is provided via configuration/environment variables.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? "Data Source=fusion.db";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Audit logging middleware - records requests to AuditLogs table (development/monitoring)
app.UseAuditLogging();

app.UseAuthorization();

app.MapControllers();

// Ensure database and seed initial admin in development
try
{
    app.EnsureSeedData();
}
catch (Exception ex)
{
    // swallow seed errors during startup so dev server can still run; log if needed
    Console.WriteLine($"Seed error: {ex.Message}");
}

app.Run();
