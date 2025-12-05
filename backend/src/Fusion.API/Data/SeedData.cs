using Fusion.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Fusion.API.Data
{
    public static class SeedData
    {
        public static void EnsureSeedData(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                // Apply any pending migrations and create the database if it doesn't exist.
                context.Database.Migrate();

                // Read initial admin credentials from configuration/environment.
                // In Docker, these come from docker-compose:
                //   InitialAdmin__Email
                //   InitialAdmin__Password
                var configuration = app.Configuration;
                var initialEmail = configuration["InitialAdmin:Email"] ?? "admin@fusion.local";
                var initialPassword = configuration["InitialAdmin:Password"] ?? "ChangeMe123!";

                // Seed Admin User if none exists
                if (!context.Admins.Any())
                {
                    context.Admins.Add(new Admin
                    {
                        // Store the initial admin email and name.
                        Email = initialEmail,
                        Name = initialEmail.Split('@').First(),
                        // WARNING: Storing plain text password for temporary development.
                        // In a real application, you MUST hash the password.
                        PasswordHash = initialPassword
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}
