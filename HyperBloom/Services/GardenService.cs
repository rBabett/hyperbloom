using HyperBloom.Models;
using HyperBloom.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Services;

public class GardenService : IGardenService
{
    private readonly GardenAppContext _context;

    public GardenService(GardenAppContext context)
    {
        _context = context;
    }

    public async Task<List<Garden>> GetGardens()
    {
        return await _context.Gardens.ToListAsync().ConfigureAwait(true);
    }

    public async Task<int> AddNewGarden(Garden garden)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        _context.Gardens.Add(garden);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
        return garden.Id;
    }

    public async Task<Garden?> GetGardenById(int id)
    {
        if (string.IsNullOrEmpty(id.ToString()))
        {
            return null;
        }

        var garden = await _context.Gardens
            .AsNoTracking()
            .Where(garden => garden.Id.Equals(id))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return garden;
    }

    public async Task<bool> DeleteGardenById(int id)
    {
        var gardenToDelete = _context.Gardens.FirstOrDefault(garden => garden.Id.Equals(id));
        if (gardenToDelete == null) return false;
        _context.Gardens.Remove(gardenToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);

        return _context.Gardens.FirstOrDefault(garden => garden.Id == gardenToDelete.Id) == null;
    }

    public async Task UpdateGarden(int id, Garden updatedGarden)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var gardenToUpdate = await _context.Gardens.FirstOrDefaultAsync(garden => garden.Id.Equals(id));
        if (gardenToUpdate != null)
        {
            PlantService.UpdateObjProperties(gardenToUpdate, updatedGarden);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task UpdateGardenCells(int id, List<Cell> cells)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var gardenToUpdate = await _context.Gardens.FirstOrDefaultAsync(garden => garden.Id.Equals(id));
        if (gardenToUpdate != null)
        {
            //TODO
        }

        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }
}