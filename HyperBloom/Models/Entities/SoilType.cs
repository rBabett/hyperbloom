using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(SoilNeeds))]
public class SoilType : Needs
{
    [Required][MaxLength(15),MinLength(5)]
    public string SoilNeeds { get; set; }

    public SoilType(string soilNeeds)
    {
        SoilNeeds = soilNeeds;
    }
}