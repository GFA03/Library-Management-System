using LibraryManagementSystem.Server.Models.DTOs.CategoryDTO;
using LibraryManagementSystem.Server.Services.CategoryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize]
        [HttpGet("GetCategories")]
        [ProducesResponseType(typeof(List<CategoryDTO>), 200)]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategories();
            return Ok(categories);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createCategory")]
        public async Task<IActionResult> AddCategory(CreateCategoryDTO categoryDto)
        {
            await _categoryService.CreateCategory(categoryDto);
            return CreatedAtAction(nameof(AddCategory), null);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateCategory")]
        public IActionResult UpdateCategory(UpdateCategoryDTO categoryDto)
        {
            _categoryService.UpdateCategory(categoryDto);
            return CreatedAtAction(nameof(UpdateCategory), null);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteCategory/{id}")]
        public async Task<IActionResult> RemoveCategory(Guid id)
        {
            var result = await _categoryService.RemoveCategory(id);
            return CreatedAtAction(nameof(RemoveCategory), null);
        }

    }
}
