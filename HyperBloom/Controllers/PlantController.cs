using System.Text.Json;
using HyperBloom.Models.Entities;
using HyperBloom.Services;
using Microsoft.AspNetCore.Mvc;

namespace HyperBloom.Controllers;

[ApiController]
[Route("api/plants")]
[Produces("application/json")]

public class PlantController : ControllerBase
{
    private readonly IPlantService _plantService;

    public PlantController(IPlantService plantService)
    {
        _plantService = plantService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPlants()
    {
        List<Plant> plants = await _plantService.GetPlants();
        return Ok(plants);
    }

    [HttpPost("add-new-plant")]
    public async Task<IActionResult> AddNewPlant([FromBody] JsonElement body)
    {
        var jsonObject = JsonSerializer.Deserialize<Plant>(body);
        if (jsonObject == null)
        {
            return BadRequest("Plant cannot be added.");
        }

        var id = await _plantService.AddNewPlant(jsonObject);
        if (!string.IsNullOrEmpty(id.ToString()))
        {
            return Ok($"Plant with id {id} has been added.");
        }

        return BadRequest("Plant cannot be added.");
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPlantById([FromRoute] int id)
    {
        var plantWithId = await _plantService.GetPlantById(id);
        if (plantWithId == null)
        {
            return NotFound($"Plant {id} cannot be found.");
        }

        return Ok(plantWithId);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePlantById([FromRoute] int id)
    {
        var result = _plantService.DeletePlantById(id);
        if (result.Result == false)
        {
            return BadRequest($"Plant {id} cannot be deleted.");
        }

        return Ok($"Plant {id} has been deleted.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlant([FromRoute] int id, [FromBody] JsonElement body)
    {
        var updatedPlant = JsonSerializer.Deserialize<Plant>(body);
        if (updatedPlant == null)
        {
            return BadRequest($"Plant {id} cannot be updated.");
        }

        await _plantService.UpdatePlant(id, updatedPlant);
        return Ok($"Plant {id} updated.");
    }

    [HttpPut("{id}/water")]
    public async Task<IActionResult> WaterPlant([FromRoute] int id)
    {
        await _plantService.WaterPlant(id);
        return Ok($"Plant {id} has been watered.");
    }

    [HttpPut("{id}/fertilize")]
    public async Task<IActionResult> FertilizePlant([FromRoute] int id)
    {
        await _plantService.FertilizePlant(id);
        return Ok($"Plant {id} has been fertilized.");
    }
}