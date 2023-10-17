using System.Text.Json;
using HyperBloom.Models.Entities;
using HyperBloom.Services;
using Microsoft.AspNetCore.Mvc;

namespace HyperBloom.Controllers;

[ApiController]
[Route("api/gardens")]
[Produces("application/json")]

public class GardenController : ControllerBase
{
    private readonly IGardenService _gardenService;

    public GardenController(IGardenService gardenService)
    {
        _gardenService = gardenService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllGardens()
    {
        List<Garden> gardens = await _gardenService.GetGardens();
        return Ok(gardens);
    }

    [HttpGet("/api/cells")]
    public async Task<IActionResult> GetAllCells()
    {
        List<Cell> cells = await _gardenService.GetCells();
        return Ok(cells);
    }

    [HttpPost("add-new-garden")]
    public async Task<IActionResult> AddNewGarden([FromBody] JsonElement body)
    {
        var jsonObject = JsonSerializer.Deserialize<Garden>(body);
        if (jsonObject == null)
        {
            return BadRequest("Garden cannot be added.");
        }

        var id = await _gardenService.AddNewGarden(jsonObject);
        if (!string.IsNullOrEmpty(id.ToString()))
        {
            return Ok($"Garden {id} has been added.");
        }

        return BadRequest("Garden cannot be added.");
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGardenById([FromRoute] int id)
    {
        var gardenWithId = await _gardenService.GetGardenById(id);
        if (gardenWithId == null)
        {
            return NotFound($"Garden {id} cannot be found.");
        }

        return Ok(gardenWithId);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteGardenById([FromRoute] int id)
    {
        var result = _gardenService.DeleteGardenById(id);
        if (result.Result == false)
        {
            return BadRequest($"Garden {id} cannot be deleted.");
        }

        return Ok($"Garden {id} has been deleted.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGarden([FromRoute] int id, [FromBody] JsonElement body)
    {
        var updatedGarden = JsonSerializer.Deserialize<Garden>(body);
        if (updatedGarden == null)
        {
            return BadRequest($"Garden {id} cannot be updated.");
        }

        await _gardenService.UpdateGarden(id, updatedGarden);
        return Ok($"Garden {id} updated.");
    }

    [HttpPut("{id}/cells")]
    public async Task<IActionResult> UpdateGardenCells([FromRoute] int id, [FromBody] JsonElement body)
    {
        var updatedCells = JsonSerializer.Deserialize<List<Cell>>(body);
        
        if (updatedCells == null)
        {
            return BadRequest($"Garden's cells cannot be updated.");
        }

        await _gardenService.UpdateGardenCells(id, updatedCells);
        return Ok($"Garden's cells updated.");
    }
    
}