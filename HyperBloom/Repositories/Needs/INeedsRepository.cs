using HyperBloom.Models.Entities;

namespace HyperBloom.Repositories;

public interface INeedsRepository<T>
{
    HashSet<Needs> GetNeedTypes();
}