using LibraryManagementSystem.Server.Data.Models.Author;
using LibraryManagementSystem.Server.Repositories.AuthorRepository;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/authors")]
    public class AuthorController : ControllerBase
    {
        private readonly AuthorRepository _authorRepository;
        public AuthorController(AuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }
        [HttpGet]
        public IActionResult GetAllAuthors()
        {
            var authors = _authorRepository.GetAllAuthors();
            return Ok(authors);
        }
        [HttpPost]
        public IActionResult AddAuthor(Author author)
        {
            _authorRepository.AddAuthor(author);
            return CreatedAtAction(nameof(GetAllAuthors), null);
        }

    }
}
