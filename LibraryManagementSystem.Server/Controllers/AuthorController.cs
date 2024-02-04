using LibraryManagementSystem.Server.Models.DTOs.AuthorDTO;
using LibraryManagementSystem.Server.Services.AuthorService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [Authorize]
        [HttpGet("getAuthorList")]
        [ProducesResponseType(typeof(List<AuthorDTO>), 200)]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors = await _authorService.GetAllAuthors();
            return Ok(authors);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createAuthor")]
        public async Task<IActionResult> AddAuthor(CreateAuthorDTO authorDto)
        {
            await _authorService.CreateAuthor(authorDto);
            return CreatedAtAction(nameof(AddAuthor), null);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateAuthor")]
        public IActionResult UpdateAuthor([FromBody] UpdateAuthorDTO authorDto)
        {
            _authorService.UpdateAuthor(authorDto);
            return CreatedAtAction(nameof(UpdateAuthor), null);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteAuthor/{id}")]
        public async Task<IActionResult> RemoveAuthor(Guid id)
        {
            var result = await _authorService.RemoveAuthor(id);
            return CreatedAtAction(nameof(RemoveAuthor), null);
        }

    }
}
