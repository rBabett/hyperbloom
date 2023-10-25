using HyperBloom.Models;
using HyperBloom.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Services;

public class SeedService : ISeedService
{
    private readonly GardenAppContext _context;

    public SeedService(GardenAppContext context)
    {
        _context = context;
    }
    
    public async Task<List<Seed>> GetSeeds()
    {
        return await _context.Seeds.ToListAsync().ConfigureAwait(true);
    }

    public async Task<int> AddNewSeed(Seed seed)
    {
        
        var transaction = await _context.Database.BeginTransactionAsync();
        _context.Seeds.Add(seed);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
        return seed.SeedId;
    }

    public async Task<Seed?> GetSeedById(int id)
    {
        if (string.IsNullOrEmpty(id.ToString()))
        {
            return null;
        }

        var seed = await _context.Seeds
            .AsNoTracking()
            .Where(seed => seed.SeedId.Equals(id))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return seed;
    }

    public async Task<bool> DeleteSeedById(int id)
    {
        var seedToDelete = _context.Seeds.FirstOrDefault(seed => seed.SeedId.Equals(id));
        if (seedToDelete == null) return false;
        _context.Seeds.Remove(seedToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        return _context.Seeds.FirstOrDefault(seed => seed.SeedId == seedToDelete.SeedId) == null;
    }

    public async Task UpdateSeed(int id, Seed updatedSeed)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var seedToUpdate = await _context.Seeds.FirstOrDefaultAsync(seed => seed.SeedId.Equals(id));
        if (seedToUpdate != null)
        {
            PlantService.UpdateObjProperties<Seed>(seedToUpdate, updatedSeed);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }
}