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

    public async Task<int> AddNewPlant(Plant plant)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        _context.Plants.Add(plant);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
        return plant.PlantId;
    }

    public async Task<Plant?> GetPlantById(int id)
    {
        if (string.IsNullOrEmpty(id.ToString()))
        {
            return null;
        }

        var plant = await _context.Plants
            .AsNoTracking()
            .Where(plant => plant.PlantId.Equals(id))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return plant;
    }

    public async Task<bool> DeletePlantById(int id)
    {
        var plantToDelete = _context.Plants.FirstOrDefault(plant => plant.PlantId.Equals(id));
        if (plantToDelete == null) return false;
        _context.Plants.Remove(plantToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);

        return _context.Plants.FirstOrDefault(plant => plant.PlantId == plantToDelete.PlantId) == null;
    }

    private bool DeleteSeed(Plant plantToDelete)
    {
        var seedToDelete = _context.Seeds.FirstOrDefault(seed => seed.SeedId.Equals(plantToDelete.PlantId));
        if (seedToDelete == null) return false;
        _context.Seeds.Remove(seedToDelete);
        return true;
    }

    public async Task UpdatePlant(int id, Plant updatedPlant)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var plantToUpdate = await _context.Plants.FirstOrDefaultAsync(plant => plant.PlantId.Equals(id));
        if (plantToUpdate != null)
        {
            UpdateObjProperties<Plant>(plantToUpdate, updatedPlant);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task WaterPlant(int id)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var plantToWater = await _context.Plants.FirstOrDefaultAsync(plant => plant.PlantId.Equals(id));
        if (plantToWater != null)
        {
            plantToWater.WateredDate = DateTime.Today;
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task FertilizePlant(int id)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var plantToWater = await _context.Plants.FirstOrDefaultAsync(plant => plant.PlantId.Equals(id));
        if (plantToWater != null)
        {
            plantToWater.FertilizedDate = DateTime.Today;
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public static void UpdateObjProperties<T>(T objToUpdate, T updatedProps)
    {
        PropertyInfo[] plantProperties = objToUpdate.GetType().GetProperties();

        foreach (PropertyInfo prop in plantProperties)
        {
            if (prop.CanWrite &&
                !prop.Name.Equals("WateredDate") &&
                !prop.Name.Equals("FertilizedDate") &&
                !prop.Name.Equals("Cells"))
            {
                var newPropValue = prop.GetValue(updatedProps);
                prop.SetValue(objToUpdate,
                    newPropValue,
                    null);
            }
        }
    }
}