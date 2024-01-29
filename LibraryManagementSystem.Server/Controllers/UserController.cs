using LibraryManagementSystem.Server.Helpers.Exceptions;
using LibraryManagementSystem.Server.Helpers.Responses;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.UserDTO;
using LibraryManagementSystem.Server.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        public UserController(IUserService userService, UserManager<User> userManager) 
        {
            _userService = userService;
            _userManager = userManager;
        }

        [HttpGet("user/{id}")]
        [ProducesResponseType(typeof(UserDTO), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 400)]
        public async Task<IActionResult> GetUser(Guid id)
        {
            try
            {
                return Ok(await _userService.GetUserById(id));
            }
            catch (Exception exception)
            {
                return NotFound(new ErrorResponse()
                {
                    StatusCode = 404,
                    Message = exception.Message
                });
            }
        }

        [HttpPost("create")]
        [ProducesResponseType(typeof(CreateUserDTO), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 400)]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO user)
        {
            try
            {
                return Ok(await _userService.CreateAsync(user));
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 500,
                    Message = exception.Message,
                });
            }
        }

        [Authorize]
        [HttpPut("update")]
        [ProducesResponseType(typeof(UserDTO), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 400)]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDTO user)
        {
            try
            {
                return Ok(await _userService.Update(user));
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 500,
                    Message = exception.Message
                });
            }
        }

        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(ErrorResponse), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 500)]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                await _userService.Delete(id);
                return Ok(new ErrorResponse()
                {
                    StatusCode = 200,
                    Message = "User was deleted successfully"
                });
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 500,
                    Message = exception.Message
                });
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(typeof(ResponseLoginDTO), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 500)]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginBody)
        {
            try
            {
                return Ok(new ResponseLoginDTO()
                {
                    Id = await _userService.Login(loginBody)
                });
            }
            catch (EmailNotFoundException exception)
            {
                return NotFound(new ErrorResponse()
                {
                    StatusCode = 404,
                    Message = exception.Message
                });
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 500,
                    Message = exception.Message
                });
            }
        }

        [Authorize]
        [ProducesResponseType(typeof(ErrorResponse), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 500)]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _userService.Logout();
                return Ok(new ErrorResponse()
                {
                    StatusCode = 200,
                    Message = "Logout was successful"
                });
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 500,
                    Message = exception.Message
                });
            }
        }

        [AllowAnonymous]
        [ProducesResponseType(typeof(ErrorResponse), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 500)]
        [HttpPost("register")]
        public async Task<IActionResult> SignUp([FromBody] SignUpDTO signUpDto)
        {
            try
            {
                return Ok(await _userService.SignUp(signUpDto));
            }
            catch (AccountAlreadyExistsException exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 400,
                    Message = exception.Message
                });
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 500,
                    Message = exception.Message
                });
            }
        }

        [HttpGet("authenticated")]
        [ProducesResponseType(typeof(CheckLogin), 200)]
        public IActionResult CheckLogin()
        {
            bool isLoggedIn = User.Identity.IsAuthenticated;
            string userId = isLoggedIn ? _userManager.GetUserId(User) : "";

            return Ok(new CheckLogin()
            {
                IsLoggedIn = isLoggedIn,
                UserId = userId
            });
        }
    }
}
