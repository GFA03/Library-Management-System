using LibraryManagementSystem.Server.Models.DTOs.BookCategoriesDTO;
using LibraryManagementSystem.Server.Services.BookCategoryService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class BookCategoryController : ControllerBase
    {
        private readonly IBookCategoryService _bookCategoryService;

        public BookCategoryController(IBookCategoryService bookCategoryService)
        {
            _bookCategoryService = bookCategoryService;
        }

        [HttpGet("GetBookCategoryList")]
        [ProducesResponseType(typeof(List<BookCategoryDTO>), 200)]
        public async Task<IActionResult> GetAllBookCategories()
        {
            var bookCategories = await _bookCategoryService.GetAllBookCategories();
            return Ok(bookCategories);
        }

        [HttpPost("CreateBookCategory")]
        public async Task<IActionResult> CreateBookCategory(BookCategoryDTO bookCategoryDto)
        {
            await _bookCategoryService.CreateBookCategory(bookCategoryDto);
            return Ok(bookCategoryDto);
        }

        [HttpDelete("RemoveBookCategory/{bookId}/{categoryId}")]
        public async Task<IActionResult> RemoveBookCategory(Guid bookId, Guid categoryId)
        {
            var result = await _bookCategoryService.RemoveBookCategory(bookId, categoryId);

            if (result)
            {
                return Ok("BookCategory relationship removed successfully.");
            }
            else
            {
                return BadRequest("Error removing BookCategory relationship.");
            }
        }
    }
}
