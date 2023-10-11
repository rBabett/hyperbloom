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
    
    [Required]
    public string Name { get; set; }
    public string LightNeeds { get; set; }
    public string WaterNeeds { get; set; }
    public string SoilNeeds { get; set; }
    public DateTime WateredDate { get; set; }
    public DateTime FertilizedDate { get; set; }
    public string Color { get; set; }
    public Plant(string name, string lightNeeds, string waterNeeds, string soilNeeds, string color)
    {
        Name = name;
        LightNeeds = lightNeeds;
        WaterNeeds = waterNeeds;
        SoilNeeds = soilNeeds;
        Color = color;
    }
}