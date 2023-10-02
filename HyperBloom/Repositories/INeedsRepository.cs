using HyperBloom.Models.Entities;

namespace HyperBloom.Repositories;

public interface INeedsRepository<T>
{
    Dictionary<string, HashSet<Needs>> GetNeedTypes();
}