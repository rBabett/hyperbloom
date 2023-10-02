using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface IPlantService
{
    Task<List<Plant>> GetPlants();
    Task AddNewPlant(Plant plant);
    Task<Plant?> GetPlantById(int id);
    Task DeletePlantById(int id);
    Task UpdatePlant(int id, Plant updatedPlant);
}