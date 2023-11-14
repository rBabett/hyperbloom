namespace HyperBloom.Models.Entities;

public class CurrentUser
{
    public string Username { get; set; }
    public string EmailAddress { get; set; }
    public string Role { get; set; }
    public int AmountOfPlants { get; set; }
    public string Badge { get; set; }

    public CurrentUser(string username, string emailAddress, string role, string badge)
    {
        Username = username;
        EmailAddress = emailAddress;
        Role = role;
        Badge = badge;
    }

}