using UserManagement.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace UserManagement.WebAPI.data;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

    protected UserDbContext()
    {
    }

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var currentDate = new DateTimeOffset(2026, 01, 15, 0, 0, 0, 0, TimeSpan.FromHours(0));
        modelBuilder.Entity<User>().HasData(
 new User() { Id = Guid.Parse("3846BD70-A0C3-4079-879D-EEA95554834C"), Name = "Greg Luo", Age = 45, City = "Sydney", State = "NSW", Pincode = "GREG", CreatedAt = currentDate, UpdatedAt = currentDate });
        modelBuilder.Entity<User>().HasData(
 new User() { Id = Guid.Parse("3DB4947A-6B4C-4F22-935F-7A9845713AC0"), Name = "LP Chen", Age = 40, City = "Sydney", State = "NSW", Pincode = "CHEN", CreatedAt = currentDate, UpdatedAt = currentDate });
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            var entity = (User)entry.Entity;

            if (entry.State == EntityState.Added)
            {
                entity.CreatedAt = DateTime.UtcNow;
            }

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}


// Add-Migration InitialCreate
// Update-Database
