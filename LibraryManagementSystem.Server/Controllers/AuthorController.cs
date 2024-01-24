using LibraryManagementSystem.Server.Models.DTOs.AuthorDTO;
using LibraryManagementSystem.Server.Services.AuthorService;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet("getAuthorList")]
        [ProducesResponseType(typeof(List<AuthorDTO>), 200)]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors = await _authorService.GetAllAuthors();
            return Ok(authors);
        }


        [HttpPost("createAuthor")]
        public async Task<IActionResult> AddAuthor(CreateAuthorDTO authorDto)
        {
            await _authorService.CreateAuthor(authorDto);
            return CreatedAtAction(nameof(AddAuthor), null);
        }

        [HttpPatch("updateAuthor")]
        public IActionResult UpdateAuthor(UpdateAuthorDTO authorDto)
        {
            _authorService.UpdateAuthor(authorDto);
            return CreatedAtAction(nameof(UpdateAuthor), null);
        }

        [HttpDelete("deleteAuthor/{id}")]
        public async Task<IActionResult> RemoveAuthor(Guid id)
        {
            var result = await _authorService.RemoveAuthor(id);
            return CreatedAtAction(nameof(RemoveAuthor), null);
        }

    }
}
