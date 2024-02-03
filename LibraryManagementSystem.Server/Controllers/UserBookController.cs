using LibraryManagementSystem.Server.Helpers.Responses;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Services.UserBookService;
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
    public class UserBookController : ControllerBase
    {
        private readonly IUserBookService _userBookService;
        private readonly UserManager<User> _userManager;

        public UserBookController(IUserBookService userBookService, UserManager<User> userManager)
        {
            _userBookService = userBookService;
            _userManager = userManager;
        }

        [Authorize]
        [ProducesResponseType(typeof(ErrorResponse), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 400)]
        [HttpPost("loan/{bookId}")]
        public async Task<IActionResult> LoanBook(Guid bookId)
        {
            var userId = _userManager.GetUserId(User);

            try
            {
                await _userBookService.LoanBook(userId, bookId);
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 400,
                    Message = exception.Message
                });
            }

            return Ok(new ErrorResponse()
            {
                StatusCode = 200,
                Message = "Loaned book!"
            });
        }

        [Authorize]
        [ProducesResponseType(typeof(ErrorResponse), 200)]
        [ProducesResponseType(typeof(ErrorResponse), 400)]
        [HttpPost("return")]
        public async Task<IActionResult> ReturnBook()
        {
            var userId = _userManager.GetUserId(User);

            try
            {
                await _userBookService.ReturnBook(userId);
            }
            catch (Exception exception)
            {
                return BadRequest(new ErrorResponse()
                {
                    StatusCode = 400,
                    Message = exception.Message
                });
            }

            return Ok(new ErrorResponse()
            {
                StatusCode = 200,
                Message = "Returned book!"
            });
        }
    }
}
