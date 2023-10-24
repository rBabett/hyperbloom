using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(SeedId))]
public class Seed
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int SeedId { get; }
    
    [Required]
    public string Name { get; set; }
    public string Color { get; set; }
    public Seed(string name, string color)
    {
        Name = name;
        Color = color;
    }
}