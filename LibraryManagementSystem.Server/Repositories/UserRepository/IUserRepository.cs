using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.UserDTO;
using LibraryManagementSystem.Server.Repositories.GenericRepository;

namespace LibraryManagementSystem.Server.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User>? GetUserById(Guid id);
        Task<User>? GetUserByUsername(string username);
        Task CreateAsync(User user);
        Task Update(User user);
        Task DeleteAsync(Guid id);
    }
}
