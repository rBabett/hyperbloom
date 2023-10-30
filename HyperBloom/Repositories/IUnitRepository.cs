using HyperBloom.Models.Entities;

namespace HyperBloom.Repositories;

public interface IUnitRepository<T>
{
    HashSet<Unit> GetUnits();
    HashSet<Unit> GetTempUnits();
}