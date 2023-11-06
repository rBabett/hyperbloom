using HyperBloom.Models.Entities;
using HyperBloom.Repositories;

namespace HyperBloom.Services;

public class UnitService: IUnitService
{
    private readonly IUnitRepository<Unit> _unitRepository;

    public UnitService(IUnitRepository<Unit> unitRepository)
    {
        _unitRepository = unitRepository;
    }

    public HashSet<Unit> GetUnits()
    {
        return _unitRepository.GetUnits();
    }

    public HashSet<Unit> GetTempUnits()
    {
        return _unitRepository.GetTempUnits();
    }
}