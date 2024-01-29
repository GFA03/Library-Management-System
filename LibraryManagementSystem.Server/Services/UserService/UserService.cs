using AutoMapper;
using LibraryManagementSystem.Server.Helpers.Exceptions;
using LibraryManagementSystem.Server.Helpers.Responses;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.UserDTO;
using LibraryManagementSystem.Server.Repositories.UserRepository;
using Microsoft.AspNetCore.Identity;
using Task = System.Threading.Tasks.Task;

namespace LibraryManagementSystem.Server.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IMapper mapper, UserManager<User> userManager,
                        SignInManager<User> signInManager,
                        IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }


        public async Task<UserDTO> GetUserByName(string username)
        {
            var user = _userRepository.GetUserByUsername(username);
            if (user == null) throw new Exception("User not found!");
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> GetUserById(Guid id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null) throw new Exception("User not found");
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> CreateAsync(CreateUserDTO user)
        {
            var userMapped = _mapper.Map<User>(user);
            await _userRepository.CreateAsync(userMapped);
            return _mapper.Map<UserDTO>(userMapped);
        }

        public async Task<UserDTO> Update(UserUpdateDTO user)
        {
            var existingUser = await _userRepository.GetUserById(user.Id);

            if (existingUser == null)
            {
                throw new Exception("User not found");
            }

            var hasher = new PasswordHasher<User>();
            if (user.Username != null) existingUser.UserName = user.Username;
            if (user.Email != null) existingUser.Email = user.Email;
            if (user.Password != null) existingUser.PasswordHash = hasher.HashPassword(null, user.Password);

            await _userRepository.Update(existingUser);
            return _mapper.Map<UserDTO>(existingUser);
        }

        public async Task Delete(Guid userId)
        {
            await _userRepository.DeleteAsync(userId);
        }

        public async Task<Guid> Login(LoginDTO loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                throw new EmailNotFoundException("Email not found");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: true);

                return user.Id;
            }

            throw new Exception("Wrong Password");
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<ErrorResponse> SignUp(SignUpDTO signUpDto)
        {
            var existsUser = await _userManager.FindByEmailAsync(signUpDto.Email);

            if (existsUser != null)
                throw new AccountAlreadyExistsException("An account with this email already exists");

            var user = _mapper.Map<User>(signUpDto);
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");

                return new ErrorResponse()
                {
                    StatusCode = 200,
                    Message = "Register was successful"
                };
            }
            throw new Exception(result.Errors.First().Description);
        }

        private async Task CreateRoles(RoleManager<IdentityRole> roleManager)
        {
            var roleNames = new[] { "ADMIN", "USER" };

            foreach (var roleName in roleNames)
            {
                var roleExists = await roleManager.RoleExistsAsync(roleName);

                if (!roleExists)
                {
                    // If the role doesn't exist, create it
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

    }
}
