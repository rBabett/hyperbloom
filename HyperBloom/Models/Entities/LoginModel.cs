using System.ComponentModel.DataAnnotations;

namespace HyperBloom.Models.Entities;

public class LoginModel
{
    [Required]
    public string Username { get; init; }
    [Required]
    public string Password { get; set; }

    public LoginModel(string username, string password)
    {
        Username = username;
        Password = password;
    }
    
}