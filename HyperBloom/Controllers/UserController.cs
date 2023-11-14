using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using HyperBloom.Models.Entities;
using HyperBloom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


namespace HyperBloom.Controllers;


[ApiController]
[Route("api/user")]
[Produces("application/json")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;

    public UserController(IConfiguration configuration, IUserService userService)
    {
        _configuration = configuration;
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("registration")]
    public async Task<IActionResult> Registration([FromBody] JsonElement body)
    {
        RegisterModel? registerModel = body.Deserialize<RegisterModel>();

        if (registerModel == null)
        {
            return BadRequest(new { message = "Something went wrong" });
        }

        try
        {
            await _userService.RegisterUser(registerModel);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] JsonElement body)
    {
        LoginModel? loginModel = body.Deserialize<LoginModel>();

        if (loginModel == null)
        {
            return BadRequest(new { message = "Something went wrong" });
        }

        if (loginModel.Username.IsNullOrEmpty()
            || loginModel.Password.IsNullOrEmpty())
        {
            return BadRequest(new { message = "Missing username or password" });
        }

        try
        {
            User user = await _userService.AuthenticateUser(loginModel);

            var token = GenerateToken(user);
            HttpContext.Response.Cookies.Append("token", token);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    [Authorize(Roles = "User")]
    [HttpPost("logout")]
    public IActionResult LogOut()
    {
        HttpContext.Response.Cookies.Delete("token");
        return Ok();
    }

    private string GenerateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Username),
            new Claim(ClaimTypes.Email, user.EmailAddress),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.GroupSid, user.Badge),
        };

        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPut("{username}")]
    public async Task<IActionResult> UpdatePlantsAmount([FromRoute] string username)
    {
        await _userService.UpdateUserPlants(username);
        return Ok();
    }

    [Authorize(Roles = "User")]
    [HttpGet("current_user")]
    public IActionResult GetCurrentUser()
    {
        var currentUser = GetCurrentUserData();
        if (currentUser != null)
        {
            return Ok(currentUser);
        }

        return BadRequest("Couldn't find user");
    }

    [Authorize(Roles = "User")]
    [HttpGet("current_user/{username}")]
    public async Task<IActionResult> GetUserData([FromRoute] string username)
    {
        bool usernameCheck = !username.IsNullOrEmpty();
        if (usernameCheck)
        {
            var currentUser = await _userService.GetUserData(username);
            return Ok(currentUser);
        }

        return BadRequest("User not found");
    }

    [NonAction]
    private CurrentUser? GetCurrentUserData()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity == null)
        {
            return null;
        }

        if (identity.Claims.Any())
        {
            var userClaims = identity.Claims;
            var username = identity.FindFirst(user => user.Type == ClaimTypes.NameIdentifier)?.Value;
            var emailAddress = identity.FindFirst(user => user.Type == ClaimTypes.Email)?.Value;
            var role = identity.FindFirst(user => user.Type == ClaimTypes.Role)?.Value;
            var badge = identity.FindFirst(user => user.Type == ClaimTypes.GroupSid)?.Value;

            if (username == null || emailAddress == null || role == null || badge == null)
            {
                return null;
            }

            return new CurrentUser(username, emailAddress, role, badge);
        }

        return null;
    }

}