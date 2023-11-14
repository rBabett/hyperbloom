using HyperBloom.Models.Entities;

namespace HyperBloom.Services;

public interface IUserService
{
    Task<User> AuthenticateUser(LoginModel loginModel);
    Task RegisterUser(RegisterModel registerModel);
    Task UpdateUserPlants(string username);
    Task<User?> GetUserData(string username);
}