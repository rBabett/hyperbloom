using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface ISeedService
{
    Task<List<Seed>> GetSeeds();
    Task<int> AddNewSeed(Seed seed);
    Task<Seed?> GetSeedById(int id);
    Task<bool> DeleteSeedById(int id);
    Task UpdateSeed(int id, Seed updatedSeed);
}