using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(WaterNeeds))]
public class WaterType : Needs
{
    [Required][MaxLength(15),MinLength(5)]
    public string WaterNeeds { get; set; }

    public WaterType(string waterNeeds)
    {
        WaterNeeds = waterNeeds;
    }
}