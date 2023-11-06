using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface IUnitService
{
    HashSet<Unit> GetUnits();
    HashSet<Unit> GetTempUnits();
}