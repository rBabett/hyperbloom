using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(UnitId))]
public class Unit
{
    [Key]
    public int UnitId { get; }
    
    [Required][MaxLength(15),MinLength(5)]
    public string Name { get; set; }
    

    public Unit(int unitId, string name)
    {
        UnitId = unitId;
        Name = name;
    }
}