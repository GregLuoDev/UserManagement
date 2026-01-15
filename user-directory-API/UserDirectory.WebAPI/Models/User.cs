using System.ComponentModel.DataAnnotations;

namespace UserDirectory.WebAPI.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Range(0, 120)]
    public int Age { get; set; }

    [Required]
    [MaxLength(100)]
    public string City { get; set; }

    [Required]
    [MaxLength(100)]
    public string State { get; set; }

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public string Pincode { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
