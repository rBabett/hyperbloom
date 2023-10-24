using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface IPlantService
{
    Task<List<Plant>> GetPlants();
    Task<List<Seed>> GetSeeds();
    Task<int> AddNewPlant(Plant plant);
    Task<Plant?> GetPlantById(int id);
    Task<bool> DeletePlantById(int id);
    Task UpdatePlant(int id, Plant updatedPlant);
    Task WaterPlant(int id);
    Task FertilizePlant(int id);
}