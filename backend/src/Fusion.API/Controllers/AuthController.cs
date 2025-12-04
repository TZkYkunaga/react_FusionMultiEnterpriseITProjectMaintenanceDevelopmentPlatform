using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fusion.API.Data;
using Fusion.API.Models;
using System.Threading.Tasks;

namespace Fusion.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid client request");
            }

            // IMPORTANT: This is a temporary, insecure login implementation for setup purposes.
            // We will replace this with proper password hashing (e.g., BCrypt) and token generation (JWT).
            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Username == loginRequest.Username);

            if (admin == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // This is a placeholder for password verification.
            // For now we compare the supplied password with the stored PasswordHash field,
            // which is seeded from configuration. In a real app, this must be a secure hash check.
            bool isPasswordValid = (loginRequest.Password == admin.PasswordHash);

            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials");
            }

            // Placeholder for token generation
            return Ok(new { Message = "Login successful" });
        }
    }
}
