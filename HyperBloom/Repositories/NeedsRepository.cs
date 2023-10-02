using HyperBloom.Models.Entities;

namespace HyperBloom.Repositories;

public class NeedsRepository : INeedsRepository<Needs>
{
    private HashSet<LightType> _lightTypes = new();
    private HashSet<WaterType> _waterTypes = new();
    private HashSet<SoilType> _soilTypes = new();
    private Dictionary<string, HashSet<Needs>> _needs = new();

    public NeedsRepository()
    {
        SeedLightTypes();
        SeedSoilTypes();
        SeedWaterTypes();
        SeedNeeds();
    }

    private void SeedNeeds()
    {
        _needs = new Dictionary<string, HashSet<Needs>>()
        {
            { "light", new HashSet<Needs>(_lightTypes) },
            { "soil", new HashSet<Needs>(_soilTypes) },
            { "water", new HashSet<Needs>(_waterTypes) }
        };
    }
    
    private void SeedLightTypes()
    {
        _lightTypes = new HashSet<LightType>()
        {
            new LightType("High light"),
            new LightType("Partial light"),
            new LightType("Low light")
        };
    }
    private void SeedSoilTypes()
    {
        _soilTypes = new HashSet<SoilType>()
        {
            new SoilType("Sandy soil"),
            new SoilType("Clay soil"),
            new SoilType("Silt soil"),
            new SoilType("Peat soil"),
            new SoilType("Chalk soil"),
            new SoilType("Loam soil")
        };
    }
    private void SeedWaterTypes()
    {
        _waterTypes = new HashSet<WaterType>()
        {
            new WaterType("Aquatic"),
            new WaterType("High"),
            new WaterType("Moderate"),
            new WaterType("Low"),
            new WaterType("Very low")
        };
    }

    public Dictionary<string, HashSet<Needs>> GetNeedTypes()
    {
        return new Dictionary<string, HashSet<Needs>>(_needs);
    }
}