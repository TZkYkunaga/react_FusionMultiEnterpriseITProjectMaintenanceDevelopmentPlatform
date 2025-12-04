using Microsoft.EntityFrameworkCore;
using Fusion.API.Models;

namespace Fusion.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Tenant entity
            modelBuilder.Entity<Tenant>(entity =>
            {
                entity.HasIndex(e => e.Domain).IsUnique();
            });

            // Configure the Admin entity
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
            });
        }
    }
}
