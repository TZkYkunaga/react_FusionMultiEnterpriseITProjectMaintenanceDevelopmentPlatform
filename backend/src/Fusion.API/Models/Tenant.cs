using System; // Added for DateTime
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fusion.API.Models
{
    [Table("Tenants")]
    public class Tenant
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public required string Name { get; set; }

        [Required]
        [StringLength(100)]
        public required string Domain { get; set; }

        [Required]
        [StringLength(50)]
        public required string Status { get; set; } = "Active";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
