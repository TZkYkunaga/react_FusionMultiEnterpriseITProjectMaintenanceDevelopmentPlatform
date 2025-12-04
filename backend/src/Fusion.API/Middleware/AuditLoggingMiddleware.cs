using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Fusion.API.Data;
using Fusion.API.Models;
using Microsoft.Extensions.DependencyInjection;

namespace Fusion.API.Middleware
{
    public class AuditLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public AuditLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var start = DateTime.UtcNow;
            // Let the pipeline run
            await _next(context);

            try
            {
                // We need to create a new scope to resolve the DbContext
                using (var scope = context.RequestServices.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    
                    var log = new AuditLog
                    {
                        Method = context.Request.Method,
                        Path = context.Request.Path + context.Request.QueryString,
                        StatusCode = context.Response.StatusCode,
                        Timestamp = start,
                    };

                    db.AuditLogs.Add(log);
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                // Swallow logging errors to avoid breaking the request
                // In a production environment, you would want to log this error to a different system
            }
        }
    }

    public static class AuditLoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuditLogging(this IApplicationBuilder app)
        {
            return app.UseMiddleware<AuditLoggingMiddleware>();
        }
    }
}
