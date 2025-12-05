using Microsoft.EntityFrameworkCore;
using Fusion.API.Data;
using Fusion.API.Middleware;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.
// Use SQLite so it works both locally and inside Docker, where the connection
// string is provided via configuration/environment variables.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? "Data Source=fusion.db";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddControllers();

// Initialize Firebase Admin SDK if service account or credentials provided.
// Provide the service account JSON path via configuration key `Firebase:ServiceAccountPath`
// or environment variable `GOOGLE_APPLICATION_CREDENTIALS`.
var firebaseServiceAccount = builder.Configuration["Firebase:ServiceAccountPath"]
                             ?? Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
var firebaseProjectId = builder.Configuration["Firebase:ProjectId"]
                        ?? Environment.GetEnvironmentVariable("FIREBASE_PROJECT_ID");

if (!string.IsNullOrEmpty(firebaseServiceAccount))
{
    try
    {
        var credential = GoogleCredential.FromFile(firebaseServiceAccount);
        var options = new AppOptions()
        {
            Credential = credential
        };
        FirebaseApp.Create(options);

        // If project ID is not provided, try to read it from the credential.
        if (string.IsNullOrEmpty(firebaseProjectId) && credential != null && credential.UnderlyingCredential is ServiceAccountCredential)
        {
            // ServiceAccountCredential doesn't expose project id directly; allow configuration to provide it.
        }

        // If project id is available, register Firestore client for DI
        if (!string.IsNullOrEmpty(firebaseProjectId))
        {
            var firestore = FirestoreDb.Create(firebaseProjectId);
            builder.Services.AddSingleton(firestore);
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Firebase init error: {ex.Message}");
    }
}

// Allow CORS for local frontend during development. Adjust for production.
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin();
    });
});

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

// Enable CORS for frontend dev
app.UseCors("DevCors");

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
