using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HyperBloom.Controllers;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(NeedsId))]
public class Needs
{
    [Key]
    public int NeedsId { get; }
    
    [Required][MaxLength(15),MinLength(5)]
    public string Name { get; set; }
    
    public Type Type { get; set; }

    public Needs(int needsId, string name, Type type)
    {
        NeedsId = needsId;
        Name = name;
        Type = type;
    }
}