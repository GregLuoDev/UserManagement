using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserDirectory.WebAPI.Controllers;
using UserDirectory.WebAPI.data;
using UserDirectory.WebAPI.DTOs;
using UserDirectory.WebAPI.Models;

namespace UserDirectory.WebAPI.Tests
{
    public class UsersControllerTests
    {
        private UserDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<UserDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new UserDbContext(options);
        }

        private UserDto GetSampleDto() => new UserDto
        {
            Name = "Sample User",
            Age = 30,
            City = "Sample City",
            State = "SC",
            Pincode = "12345"
        };

        private User GetSampleUser() => new User
        {
            Id = Guid.NewGuid(),
            Name = "Existing User",
            Age = 25,
            City = "Existing City",
            State = "EX",
            Pincode = "54321",
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };

        [Fact]
        public async Task GetUsers_ReturnsAllUsers()
        {
            var db = GetInMemoryDbContext();
            db.Users.Add(GetSampleUser());
            await db.SaveChangesAsync();

            var controller = new UsersController(db);
            var result = await controller.GetUsers();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var users = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);
            Assert.Single(users);
        }

        [Fact]
        public async Task GetUser_ExistingId_ReturnsUser()
        {
            var db = GetInMemoryDbContext();
            var user = GetSampleUser();
            db.Users.Add(user);
            await db.SaveChangesAsync();

            var controller = new UsersController(db);
            var result = await controller.GetUser(user.Id);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returned = Assert.IsType<User>(okResult.Value);
            Assert.Equal(user.Id, returned.Id);
        }

        [Fact]
        public async Task GetUser_NonExistingId_ReturnsNotFound()
        {
            var db = GetInMemoryDbContext();
            var controller = new UsersController(db);

            var result = await controller.GetUser(Guid.NewGuid());

            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Contains("not found", notFound.Value.ToString(), StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task PostUser_ValidDto_CreatesUser()
        {
            var db = GetInMemoryDbContext();
            var controller = new UsersController(db);
            var dto = GetSampleDto();

            var result = await controller.PostUser(dto);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var created = Assert.IsType<User>(createdResult.Value);
            Assert.Equal(dto.Name, created.Name);
            Assert.Equal(dto.Age, created.Age);
            Assert.Equal(dto.City, created.City);
            Assert.Equal(dto.State, created.State);
            Assert.Equal(dto.Pincode, created.Pincode);
        }

        [Fact]
        public async Task PostUser_NullDto_ReturnsBadRequest()
        {
            var db = GetInMemoryDbContext();
            var controller = new UsersController(db);

            var result = await controller.PostUser(null);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("User data cannot be null.", badRequest.Value);
        }

        [Fact]
        public async Task PutUser_ValidDto_UpdatesUser()
        {
            var db = GetInMemoryDbContext();
            var user = GetSampleUser();
            db.Users.Add(user);
            await db.SaveChangesAsync();

            var controller = new UsersController(db);
            var dto = new UserDto
            {
                Name = "Updated Name",
                Age = 40,
                City = "Updated City",
                State = "UT",
                Pincode = "99999"
            };

            var result = await controller.PutUser(user.Id, dto);

            Assert.IsType<NoContentResult>(result);
            var updated = await db.Users.FindAsync(user.Id);
            Assert.Equal("Updated Name", updated.Name);
            Assert.Equal(40, updated.Age);
            Assert.Equal("Updated City", updated.City);
            Assert.Equal("UT", updated.State);
            Assert.Equal("99999", updated.Pincode);
        }

        [Fact]
        public async Task PutUser_NullDto_ReturnsBadRequest()
        {
            var db = GetInMemoryDbContext();
            var controller = new UsersController(db);

            var result = await controller.PutUser(Guid.NewGuid(), null);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("User cannot be null.", badRequest.Value);
        }

        [Fact]
        public async Task PutUser_NonExistingId_ReturnsNotFound()
        {
            var db = GetInMemoryDbContext();
            var controller = new UsersController(db);

            var result = await controller.PutUser(Guid.NewGuid(), GetSampleDto());

            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Contains("not found", notFound.Value.ToString(), StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task DeleteUser_ExistingId_ReturnsNoContent()
        {
            var db = GetInMemoryDbContext();
            var user = GetSampleUser();
            db.Users.Add(user);
            await db.SaveChangesAsync();

            var controller = new UsersController(db);
            var result = await controller.DeleteUser(user.Id);

            Assert.IsType<NoContentResult>(result);
            Assert.Null(await db.Users.FindAsync(user.Id));
        }

        [Fact]
        public async Task DeleteUser_NonExistingId_ReturnsNotFound()
        {
            var db = GetInMemoryDbContext();
            var controller = new UsersController(db);

            var result = await controller.DeleteUser(Guid.NewGuid());

            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Contains("not found", notFound.Value.ToString(), StringComparison.OrdinalIgnoreCase);
        }
    }
}