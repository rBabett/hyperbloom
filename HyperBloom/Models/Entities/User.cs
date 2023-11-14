using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;


[PrimaryKey(nameof(Username))]
public class User
{
    public string Username { get; init; }
    public string EmailAddress { get; init; }
    public string Role { get; set; }
    public string Password { get; init; }
    public int AmountOfPlants { get; set; }
    public string Badge { get; set; }

    public User(string username, string emailAddress, string role, string password)
    {
        Username = username;
        EmailAddress = emailAddress;
        Role = role;
        Password = password;
        AmountOfPlants = 0;
        Badge = "Newbie";
    }
    
}