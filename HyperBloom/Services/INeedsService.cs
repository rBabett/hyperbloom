using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface INeedsService
{
    HashSet<Needs> GetNeedTypes();
}