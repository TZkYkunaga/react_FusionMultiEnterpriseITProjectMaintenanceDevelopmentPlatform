using System; // Added for DateTime
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fusion.API.Models
{
    [Table("AuditLogs")]
    public class AuditLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(10)] // From snapshot
        public required string Method { get; set; }

        [Required]
        [StringLength(2048)] // From snapshot
        public required string Path { get; set; }

        [StringLength(256)] // From snapshot
        public string? UserEmail { get; set; } // Nullable from snapshot

        public int StatusCode { get; set; } // Non-nullable from snapshot

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public string? Details { get; set; } // Nullable from snapshot
    }
}
