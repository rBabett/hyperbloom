using HyperBloom.Models.Entities;
using Type = HyperBloom.Models.Entities.Type;

namespace HyperBloom.Repositories;

public class NeedsRepository : INeedsRepository<Needs>
{
    private HashSet<Needs> _needs = new();

    public NeedsRepository()
    {
        SeedNeeds();
    }

    private void SeedNeeds()
    {
        _needs = new HashSet<Needs>()
        { 
            new Needs(1,"High light", Type.Light),
            new Needs(2,"Partial light", Type.Light),
            new Needs(3, "Low light", Type.Light),
            new Needs(4, "Sandy soil", Type.Soil),
            new Needs(5, "Clay soil", Type.Soil),
            new Needs(6, "Silt soil", Type.Soil),
            new Needs(7, "Peat soil", Type.Soil),
            new Needs(8, "Chalk soil", Type.Soil),
            new Needs(9, "Loam soil", Type.Soil),
            new Needs(10,"Aquatic", Type.Water),
            new Needs(11,"High", Type.Water),
            new Needs(12,"Moderate", Type.Water),
            new Needs(13,"Low", Type.Water),
            new Needs(14,"Very low", Type.Water),
        };
    }

    public HashSet<Needs> GetNeedTypes()
    {
        return new HashSet<Needs>(_needs);
    }
}