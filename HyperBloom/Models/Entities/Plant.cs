using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;


[PrimaryKey(nameof(Id))]
public class Plant
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; }
    
    [Required][MaxLength(30),MinLength(5)]
    public string Name { get; set; }
    
    [Required][MaxLength(8)]
    public string Abbreviation { get; set; }
    public string LightNeeds { get; set; }
    public string WaterNeeds { get; set; }
    public string SoilNeeds { get; set; }
    public Plant(string name, string lightNeeds, string waterNeeds, string soilNeeds, string abbreviation)
    {
        Name = name;
        LightNeeds = lightNeeds;
        WaterNeeds = waterNeeds;
        SoilNeeds = soilNeeds;
        Abbreviation = abbreviation;
    }
}