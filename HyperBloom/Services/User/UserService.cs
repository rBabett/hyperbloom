using HyperBloom.Models;
using HyperBloom.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace HyperBloom.Services;

public class UserService : IUserService
{
    private readonly GardenAppContext _context;
    private static readonly string ErrorMessageSpace = "// ";

    public UserService(GardenAppContext context)
    {
        _context = context;
    }
    
    public async Task<User> AuthenticateUser(LoginModel loginModel)
    {
        User? currentUser = await _context.Users.FirstOrDefaultAsync(user =>
            user.Username == loginModel.Username);

        if (currentUser == null)
        {
            throw new Exception("User not found");
        }

        if (!BCrypt.Net.BCrypt.EnhancedVerify(loginModel.Password, currentUser.Password))
        {
            throw new Exception("Wrong Password");
        }

        return currentUser;
    }

    public async Task RegisterUser(RegisterModel registerModel)
    {
        if (registerModel.Username.IsNullOrEmpty()
            || registerModel.EmailAddress.IsNullOrEmpty()
            || registerModel.Password.IsNullOrEmpty()
            || registerModel.PasswordConfirmation.IsNullOrEmpty())
        {
            throw new Exception("One of the fields is empty");
        }

        await UsernameValidator(registerModel.Username);
        PasswordValidator(registerModel.Password, registerModel.PasswordConfirmation);

        string password = BCrypt.Net.BCrypt.EnhancedHashPassword(registerModel.Password);

        var newUser = new User(registerModel.Username, registerModel.EmailAddress, "User", password);
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync().ConfigureAwait(true);
    }

    public async Task UpdateUserPlants(string username)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var userToUpdate = await _context.Users.FirstOrDefaultAsync(user => user.Username == username);
        if (userToUpdate != null)
        {
            userToUpdate.AmountOfPlants++;
            UpdateUserBadge(userToUpdate);
        }

        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task<User?> GetUserData(string username)
    {
        if (username.IsNullOrEmpty())
        {
            return null;
        }

        var user = await _context.Users
            .AsNoTracking()
            .Where(user => user.Username == username)
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);

        return user;
    }


    private void UpdateUserBadge(User user)
    {
        int userPlants = user.AmountOfPlants;

        if (Enumerable.Range(1,5).Contains(userPlants))
        {
            user.Badge = "Beginner";
        } else if (Enumerable.Range(6, 10).Contains(userPlants))
        {
            user.Badge = "Hobbyist";
        } else if (Enumerable.Range(11, 15).Contains(userPlants))
        {
            user.Badge = "Green Thumb";
        } else if (Enumerable.Range(16, 20).Contains(userPlants))
        {
            user.Badge = "Advanced Plantist";
        }

    }
    
    private async Task UsernameValidator(string username)
    {
        bool isUsernameHasSpace = username.Contains(" ");
        bool isUsernameLessMinLength = username.Length < 4;
        bool isUsernameMoreMaxLength = username.Length > 25;
        bool isUsernameExists = await _context.Users.FirstOrDefaultAsync(user => user.Username.Equals(username)) == null;

        List<string> messages = new List<string>();

        if (isUsernameHasSpace)
        {
            messages.Add("Username cannot contain space");
        }

        if (isUsernameLessMinLength)
        {
            messages.Add("Username has to be at least 4 characters long");
        }

        if (isUsernameMoreMaxLength)
        {
            messages.Add("Username can't be more than 25 characters long");
        }
        
        if (!isUsernameExists)
        {
            messages.Add("Username already taken");
        }

        if (messages.Count > 0)
        {
            throw new Exception(string.Join(ErrorMessageSpace, messages));
        }

    }

    private void PasswordValidator(string password, string confirmPassword)
    {
        bool isPasswordHasSpace = password.Contains(" ");
        bool isPasswordLessMinLength = password.Length < 8;
        bool isPasswordContainsUppercase = password.Any(char.IsUpper);
        bool isPasswordContainsLowercase = password.Any(char.IsLower);
        bool isPasswordContainsNumber = password.Any(char.IsDigit);
        bool isPasswordContainsSpecialCharacter = password.Any(ch => Char.IsPunctuation(ch) || Char.IsSymbol(ch));
        bool arePasswordsMatching = password.Equals(confirmPassword);

        List<string> messages = new List<string>();

        if (isPasswordHasSpace)
        {
            messages.Add("Password cannot contain space");
        }

        if (isPasswordLessMinLength)
        {
            messages.Add("Password has to be at least 8 characters long");
        }

        if (!isPasswordContainsUppercase)
        {
            messages.Add("Password must have at least one uppercase character");
        }
        
        if (!isPasswordContainsLowercase)
        {
            messages.Add("Password must have at least one lowercase character");
        }
        
        if (!isPasswordContainsNumber)
        {
            messages.Add("Password must have at least one number");
        }
        
        if (!isPasswordContainsSpecialCharacter)
        {
            messages.Add("Password must have at least one special character like: ,.-;!?@*");
        }
        
        if (!arePasswordsMatching)
        {
            messages.Add("Passwords aren't matching");
        }

        if (messages.Count > 0)
        {
            string errorMessages = string.Join(ErrorMessageSpace, messages);
            throw new Exception(errorMessages);
        }
    }
}