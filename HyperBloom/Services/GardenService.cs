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
        return await _context.Gardens.Include(g => g.Cells).ThenInclude(c => c.Plant).ToListAsync().ConfigureAwait(true);
    }

    public async Task<List<Cell>> GetCells()
    {
        return await _context.Cells.Include(c => c.Plant).ToListAsync().ConfigureAwait(true);
    }

    public async Task<int> AddNewGarden(Garden garden)
    {
        var transaction = await _context.Database.BeginTransactionAsync();

        for (int column = 1; column <= garden.Columns; column++)
        {
            for (int row = 1; row <= garden.Rows; row++)
            {
                Cell currentCell = new Cell(garden.GardenId, column, row);
                _context.Cells.Add(currentCell);
                garden.Cells.Add(currentCell);
            }
        }

        _context.Gardens.Add(garden);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
        return garden.GardenId;
    }

    public async Task<Garden?> GetGardenById(int id)
    {
        if (string.IsNullOrEmpty(id.ToString()))
        {
            return null;
        }

        var garden = await _context.Gardens
            .AsNoTracking()
            .Where(garden => garden.GardenId.Equals(id))
            .Include(g => g.Cells)
            .ThenInclude(c => c.Plant)
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return garden;
    }

    public async Task<bool> DeleteGardenById(int id)
    {
        var gardenToDelete = _context.Gardens.FirstOrDefault(garden => garden.GardenId.Equals(id));
        if (gardenToDelete == null) return false;
        foreach (Cell cell in gardenToDelete.Cells)
        {
            _context.Cells.Remove(cell);
        }
        _context.Gardens.Remove(gardenToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);

        return _context.Gardens.FirstOrDefault(garden => garden.GardenId == gardenToDelete.GardenId) == null;
    }

    public async Task UpdateGarden(int id, Garden updatedGarden)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var gardenToUpdate = await _context.Gardens.FirstOrDefaultAsync(garden => garden.GardenId.Equals(id));
        if (gardenToUpdate != null)
        {
            PlantService.UpdateObjProperties(gardenToUpdate, updatedGarden);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task UpdateGardenCells(int id, List<Cell> updatedCells)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var gardenToUpdate = await _context.Gardens.FirstOrDefaultAsync(garden => garden.GardenId.Equals(id));
        if (gardenToUpdate != null)
        {
            await UpdateCells(updatedCells, gardenToUpdate);
        }
        
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    private async Task UpdateCells(List<Cell> updatedCells, Garden gardenToUpdate)
    {
        List<Cell> cellsInGarden =
            await _context.Cells.Include(c => c.Plant).Where(cell => cell.GardenId.Equals(gardenToUpdate.GardenId)).ToListAsync();
        foreach (Cell cellToUpdate in cellsInGarden)
        {
            foreach (Cell updatedCell in updatedCells)
            {
                if (cellToUpdate.CellId == updatedCell.CellId)
                {
                    PlantService.UpdateObjProperties(cellToUpdate, updatedCell);
                }
            }
        }
    }
}