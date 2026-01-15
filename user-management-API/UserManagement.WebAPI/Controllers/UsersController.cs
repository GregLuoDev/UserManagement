using UserManagement.WebAPI.DTOs;
using UserManagement.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagement.WebAPI.data;

namespace UserManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserDbContext _context;

        public UsersController(UserDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when retrieving users: {ex.Message}");
            }
        }

        // GET: api/Users/3846bd70-a0c3-4079-879d-eea95554834c
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when retrieving user: {ex.Message}");
            }
        }

        // PUT: api/Users/3846bd70-a0c3-4079-879d-eea95554834c
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, UserDto userDto)
        {
            if (userDto is null)
            {
                return BadRequest("User cannot be null.");
            }

            try
            {
                var entity = await _context.Users.FindAsync(id);
                if (entity is null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                if (!string.IsNullOrEmpty(userDto.Name))
                {
                    entity.Name = userDto.Name;
                }
                if (userDto.Age>0)
                {
                    entity.Age = userDto.Age;
                }
                if (!string.IsNullOrEmpty(userDto.City))
                {
                    entity.City = userDto.City;
                }
                if (!string.IsNullOrEmpty(userDto.State))
                {
                    entity.State = userDto.State;
                }
                if (!string.IsNullOrEmpty(userDto.Pincode))
                {
                    entity.Pincode = userDto.Pincode;
                }
                //_context.Entry(entity).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                    return NotFound($"User with ID {id} no longer exists.");

                throw;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when updating user: {ex.Message}");
            }
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDto userDto)
        {
            if (userDto is null)
            {
                return BadRequest("User data cannot be null.");
            }

            try
            {
                var entity = new User
                {
                    Name = userDto.Name,
                    Age = userDto.Age,
                    City = userDto.City,
                    State = userDto.State,
                    Pincode = userDto.Pincode
                };

                _context.Users.Add(entity);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUser), new { id = entity.Id }, entity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when creating user: {ex.Message}");
            }
        }

        // DELETE: api/Users/3846bd70-a0c3-4079-879d-eea95554834c
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when deleting user: {ex.Message}");
            }
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
