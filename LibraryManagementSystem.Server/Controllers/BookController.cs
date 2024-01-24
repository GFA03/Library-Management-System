using LibraryManagementSystem.Server.Models.DTOs.BookDTO;
using LibraryManagementSystem.Server.Services.BookService;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("all")]
        [ProducesResponseType(typeof(List<BookDTO>), 200)]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookService.GetAllBooks();
            return Ok(books);
        }


        [HttpPost("create")]
        public async Task<IActionResult> AddBook(CreateBookDTO bookDto)
        {
            await _bookService.CreateBook(bookDto);
            return CreatedAtAction(nameof(AddBook), null);
        }

        [HttpPatch("update")]
        public IActionResult UpdateBook(UpdateBookDTO bookDto)
        {
            _bookService.UpdateBook(bookDto);
            return CreatedAtAction(nameof(UpdateBook), null);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> RemoveBook(Guid id)
        {
            var result = await _bookService.RemoveBook(id);
            return CreatedAtAction(nameof(RemoveBook), null);
        }
    }
}
