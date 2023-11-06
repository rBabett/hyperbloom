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
    public string LightNeeds { get; set; }
    public string WaterNeeds { get; set; }
    public string SoilNeeds { get; set; }
    public int ExpectedHarvestAmount { get; set; }
    public int ActualHarvestAmount { get; set; }
    public int LowerTemp { get; set; }
    public int HigherTemp { get; set; }
    public string TempUnit { get; set; }
    public string HarvestUnit { get; set; }

    public Seed(string name, string lightNeeds, string waterNeeds, string soilNeeds, string color,
        int expectedHarvestAmount, string harvestUnit, int lowerTemp, int higherTemp, string tempUnit)
    {
        Name = name;
        LightNeeds = lightNeeds;
        WaterNeeds = waterNeeds;
        SoilNeeds = soilNeeds;
        Color = color;
        ExpectedHarvestAmount = expectedHarvestAmount;
        ActualHarvestAmount = 0;
        HarvestUnit = harvestUnit;
        LowerTemp = lowerTemp;
        HigherTemp = higherTemp;
        TempUnit = tempUnit;
    }
}