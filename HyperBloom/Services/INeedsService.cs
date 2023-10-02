using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface INeedsService
{
    Dictionary<string, HashSet<Needs>> GetNeedTypes();
}