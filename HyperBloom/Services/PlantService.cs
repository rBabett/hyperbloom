using System.Reflection;
using HyperBloom.Models;
using HyperBloom.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace HyperBloom.Services;

public class PlantService : IPlantService
{
    private readonly GardenAppContext _context;

    public PlantService(GardenAppContext context)
    {
        _context = context;
    }

    public async Task<List<Plant>> GetPlants()
    {
        return await _context.Plants.ToListAsync().ConfigureAwait(true);
    }

    public async Task AddNewPlant(Plant plant)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        _context.Plants.Add(plant);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task<Plant?> GetPlantById(int id)
    {
        if (String.IsNullOrEmpty(id.ToString()))
        {
            return null;
        }

        var plant = await _context.Plants
            .AsNoTracking()
            .Where(plant => plant.Id.Equals(id))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return plant;
    }

    public async Task DeletePlantById(int id)
    {
        var plantToDelete = _context.Plants.FirstOrDefault(plant => plant.Id.Equals(id));
        if (plantToDelete == null) return;
        _context.Plants.Remove(plantToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);
    }

    public async Task UpdatePlant(int id, Plant updatedPlant)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var plantToUpdate = await _context.Plants.FirstOrDefaultAsync(plant => plant.Id.Equals(id));
        if (plantToUpdate != null)
        {
            UpdatePlantProperties(plantToUpdate, updatedPlant);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    private void UpdatePlantProperties(Plant plantToUpdate, Plant updatedProps)
    {
        PropertyInfo[] plantProperties = plantToUpdate.GetType().GetProperties();

        foreach (PropertyInfo prop in plantProperties)
        {
            if (prop.CanWrite)
            {
                var newPropValue = prop.GetValue(updatedProps);
                prop.SetValue(plantToUpdate,
                    newPropValue,
                    null);
            }
        }
    }
}