using HyperBloom.Models.Entities;

namespace HyperBloom.Repositories;

public class UnitRepository : IUnitRepository<Unit>
{
    private HashSet<Unit> _units = new();
    private HashSet<Unit> _tempUnits = new();

    public UnitRepository()
    {
        SeedUnits();
        SeedTempUnits();
    }

    private void SeedUnits()
    {
        _units = new HashSet<Unit>()
        { 
            new Unit(1, "g"),
            new Unit(2, "kg"),
            new Unit(3, "ton"),
            new Unit(4, "oz"),
            new Unit(5, "lb"),
            new Unit(6, "cwt"),
            new Unit(7, "cm"),
            new Unit(8, "metre"),
            new Unit(9, "in"),
            new Unit(10, "ft"),
            new Unit(11, "pieces"),
            new Unit(12, "flowers"),
            new Unit(13, "tubers"),
            new Unit(14, "plants"),
            new Unit(15, "seeds"),
            new Unit(16, "fruits"),
            
        };
    }
    
    private void SeedTempUnits()
    {
        _tempUnits = new HashSet<Unit>()
        { 
            new Unit(17, "°C"),
            new Unit(18, "°F"),
        };
    }

    public HashSet<Unit> GetUnits()
    {
        return new HashSet<Unit>(_units);
    }
    
    public HashSet<Unit> GetTempUnits()
    {
        return new HashSet<Unit>(_tempUnits);
    }
}