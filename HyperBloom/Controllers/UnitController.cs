using HyperBloom.Services;
using Microsoft.AspNetCore.Mvc;

namespace HyperBloom.Controllers;

[ApiController]
[Route("api/units")]
[Produces("application/json")]

public class UnitController : ControllerBase
{
    private readonly IUnitService _unitService;

    public UnitController(IUnitService unitService)
    {
        _unitService = unitService;
    }

    [HttpGet]
    public IActionResult GetUnits() => new JsonResult(_unitService.GetUnits());

    [HttpGet("temp")]
    public IActionResult GetTempUnits() => new JsonResult(_unitService.GetTempUnits());
}