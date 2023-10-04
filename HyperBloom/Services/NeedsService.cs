using HyperBloom.Models.Entities;
using HyperBloom.Repositories;

namespace HyperBloom.Services;

public class NeedsService : INeedsService
{
    private readonly INeedsRepository<Needs> _needsRepository;

    public NeedsService(INeedsRepository<Needs> needsRepository)
    {
        _needsRepository = needsRepository;
    }


    public HashSet<Needs> GetNeedTypes() => _needsRepository.GetNeedTypes();
}