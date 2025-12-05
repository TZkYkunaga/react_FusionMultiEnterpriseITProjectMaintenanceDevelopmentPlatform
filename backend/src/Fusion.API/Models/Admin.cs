using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fusion.API.Models
{
    [Table("Admins")]
    public class Admin
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public required string Email { get; set; }

        [StringLength(100)]
        public string? Name { get; set; } // Made nullable to match snapshot and previous intent

        [Required]
        [StringLength(255)]
        public required string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
