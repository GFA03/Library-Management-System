using LibraryManagementSystem.Server.Helpers.Responses;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.UserDTO;

namespace LibraryManagementSystem.Server.Services.UserService
{
    public interface IUserService
    {
        Task<UserDTO> GetUserById(Guid id);
        Task<UserDTO> GetUserByName(string name);
        Task<UserDTO> CreateAsync(CreateUserDTO user);
        Task<UserDTO> Update(UserUpdateDTO user);
        Task Delete(Guid userId);
        Task<Guid> Login(LoginDTO loginModel);
        Task Logout();
        Task<ErrorResponse> SignUp(SignUpDTO signUpDto);
    }
}
