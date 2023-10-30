using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;


[PrimaryKey(nameof(PlantId))]
public class Plant
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int PlantId { get; }
    
    [Required]
    public string Name { get; set; }
    public string LightNeeds { get; set; }
    public string WaterNeeds { get; set; }
    public string SoilNeeds { get; set; }
    public DateTime WateredDate { get; set; }
    public DateTime FertilizedDate { get; set; }
    public string Color { get; set; }
    public double ExpectedHarvestAmount { get; set; }
    public double ActualHarvestAmount { get; set; }
    public int LowerTemp { get; set; }
    public int HigherTemp { get; set; }
    public string TempUnit { get; set; }
    public string HarvestUnit { get; set; }
    public Plant(string name, string lightNeeds, string waterNeeds, string soilNeeds, string color, double expectedHarvestAmount, string harvestUnit)
    {
        Name = name;
        LightNeeds = lightNeeds;
        WaterNeeds = waterNeeds;
        SoilNeeds = soilNeeds;
        Color = color;
        ExpectedHarvestAmount = expectedHarvestAmount;
        ActualHarvestAmount = 0;
        HarvestUnit = harvestUnit;
    }
}