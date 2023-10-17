using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface IGardenService
{
    Task<List<Garden>> GetGardens();
    Task<List<Cell>> GetCells();
    Task<int> AddNewGarden(Garden garden);
    Task<Garden?> GetGardenById(int id);
    Task<bool> DeleteGardenById(int id);
    Task UpdateGarden(int id, Garden updatedGarden);
    Task UpdateGardenCells(int id, List<Cell> cells);

    Task WaterCell(int id);
    Task FertilizeCell(int id);
}