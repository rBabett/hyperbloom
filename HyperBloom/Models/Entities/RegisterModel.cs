using System.ComponentModel.DataAnnotations;

namespace HyperBloom.Models.Entities;

public class RegisterModel : LoginModel
{
    [Required]
    [Compare("Password")] 
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
        ErrorMessage =
            "Passwords must be at least 8 characters long and contain uppercase letters, lowercase letters, digits and special characters")]
    public string PasswordConfirmation { get; set; } = default!;
    
    [Required]
    public string EmailAddress { get; set; }

    public RegisterModel(string username, string password, string emailAddress) : base(username, password)
    {
        EmailAddress = emailAddress;
    }
}