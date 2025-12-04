using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Fusion.API.Migrations
{
    [DbContext(typeof(Fusion.API.Data.ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            modelBuilder.Entity("Fusion.API.Models.Tenant", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("int");
                b.Property<string>("Domain").IsRequired().HasMaxLength(100).HasColumnType("nvarchar(100)");
                b.Property<DateTime>("CreatedAt").HasColumnType("datetime2");
                b.Property<string>("Name").IsRequired().HasMaxLength(255).HasColumnType("nvarchar(255)");
                b.Property<DateTime?>("UpdatedAt").HasColumnType("datetime2");
                b.Property<string>("Status").IsRequired().HasMaxLength(50).HasColumnType("nvarchar(50)");
                b.HasKey("Id");
                b.HasIndex("Domain").IsUnique();
                b.ToTable("Tenants");
            });

            modelBuilder.Entity("Fusion.API.Models.Admin", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("int");
                b.Property<DateTime>("CreatedAt").HasColumnType("datetime2");
                b.Property<string>("Email").IsRequired().HasMaxLength(255).HasColumnType("nvarchar(255)");
                b.Property<string>("Name").HasMaxLength(100).HasColumnType("nvarchar(100)");
                b.Property<string>("PasswordHash").IsRequired().HasMaxLength(255).HasColumnType("nvarchar(255)");
                b.HasKey("Id");
                b.ToTable("Admins");
            });

            modelBuilder.Entity("Fusion.API.Models.AuditLog", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("int");
                b.Property<string>("Method").IsRequired().HasMaxLength(10).HasColumnType("nvarchar(10)");
                b.Property<string>("Path").IsRequired().HasMaxLength(2048).HasColumnType("nvarchar(2048)");
                b.Property<string>("UserEmail").HasMaxLength(256).HasColumnType("nvarchar(256)");
                b.Property<int>("StatusCode").HasColumnType("int");
                b.Property<DateTime>("Timestamp").HasColumnType("datetime2");
                b.Property<string>("Details").HasColumnType("nvarchar(max)");
                b.HasKey("Id");
                b.ToTable("AuditLogs");
            });
        }
    }
}
