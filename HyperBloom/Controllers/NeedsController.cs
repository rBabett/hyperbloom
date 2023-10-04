using HyperBloom.Services;
using Microsoft.AspNetCore.Mvc;

namespace HyperBloom.Controllers;

[ApiController]
[Route("api/needs")]
[Produces("application/json")]

public class NeedsController : ControllerBase
{
    private readonly INeedsService _needsService;

    public NeedsController(INeedsService needsService)
    {
        _needsService = needsService;
    }

    [HttpGet]
    public IActionResult GetAllNeeds() => new JsonResult(_needsService.GetNeedTypes());
}