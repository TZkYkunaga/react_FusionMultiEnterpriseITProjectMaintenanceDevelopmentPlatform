using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fusion.API.Data;
using Fusion.API.Models;
using System.Threading.Tasks;
using System;
using System.Linq;
using FirebaseAdmin.Auth;

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
            public required string Username { get; set; }
            public required string Password { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            // If an Authorization header with a Firebase ID token is supplied, validate it.
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                var idToken = authHeader.Substring("Bearer ".Length).Trim();
                try
                {
                    var decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
                    var email = decoded.Claims.ContainsKey("email") ? decoded.Claims["email"]?.ToString() : decoded.Uid;
                    if (string.IsNullOrEmpty(email))
                    {
                        return Unauthorized("Firebase token missing email");
                    }

                    var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == email);
                    if (admin == null)
                    {
                        admin = new Admin
                        {
                            Email = email,
                            Name = email.Split('@').FirstOrDefault() ?? email,
                            PasswordHash = string.Empty
                        };
                        _context.Admins.Add(admin);
                        await _context.SaveChangesAsync();
                    }

                    return Ok(new { Message = "Login successful", Email = email, Uid = decoded.Uid });
                }
                catch (FirebaseAuthException fex)
                {
                    return Unauthorized($"Invalid Firebase ID token: {fex.Message}");
                }
                catch (Exception ex)
                {
                    return BadRequest($"Token validation error: {ex.Message}");
                }
            }

            // Fallback: legacy username/password login (kept for compatibility)
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid client request");
            }

            // Find the admin user by their email (username).
            var legacyAdmin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == loginRequest.Username);

            if (legacyAdmin == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // WARNING: Insecure plain text password comparison for temporary development.
            bool isPasswordValid = loginRequest.Password == legacyAdmin.PasswordHash;

            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(new
            {
                message = "Login successful",
                user = new { legacyAdmin.Email, legacyAdmin.Name }
            });
        }
    }
}
