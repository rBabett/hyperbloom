using System.Text.Json;
using HyperBloom.Models.Entities;
using HyperBloom.Services;
using Microsoft.AspNetCore.Mvc;

namespace HyperBloom.Controllers;

[ApiController]
[Route("api/seeds")]
[Produces("application/json")]
public class SeedController : ControllerBase
{
    private readonly ISeedService _seedService;

    public SeedController(ISeedService seedService)
    {
        _seedService = seedService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSeeds()
    {
        List<Seed> seeds = await _seedService.GetSeeds();
        return Ok(seeds);
    }
    
    [HttpPost("add-new-seed")]
    public async Task<IActionResult> AddNewSeed([FromBody] JsonElement body)
    {
        var jsonObject = JsonSerializer.Deserialize<Seed>(body);
        if (jsonObject == null)
        {
            return BadRequest("Seed cannot be added.");
        }

        var id = await _seedService.AddNewSeed(jsonObject);
        if (!string.IsNullOrEmpty(id.ToString()))
        {
            return Ok($"Seed {id} has been added.");
        }

        return BadRequest("Seed cannot be added.");
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSeedById([FromRoute] int id)
    {
        var seedWithId = await _seedService.GetSeedById(id);
        if (seedWithId == null)
        {
            return NotFound($"Seed {id} cannot be found.");
        }

        return Ok(seedWithId);
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteSeedById([FromRoute] int id)
    {
        var result = _seedService.DeleteSeedById(id);
        if (result.Result == false)
        {
            return BadRequest($"Seed {id} cannot be deleted.");
        }

        return Ok($"Seed {id} has been deleted.");
    }
    
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSeed([FromRoute] int id, [FromBody] JsonElement body)
    {
        var updatedSeed = JsonSerializer.Deserialize<Seed>(body);
        if (updatedSeed == null)
        {
            return BadRequest($"Seed {id} cannot be updated.");
        }

        await _seedService.UpdateSeed(id, updatedSeed);
        return Ok($"Seed {id} updated.");
    }
}