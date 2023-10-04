using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HyperBloom.Controllers;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(Id))]
public class Needs
{
    [Key]
    public int Id { get; }
    
    [Required][MaxLength(15),MinLength(5)]
    public string Name { get; set; }
    
    public Type Type { get; set; }

    public Needs(int id, string name, Type type)
    {
        Id = id;
        Name = name;
        Type = type;
    }
}