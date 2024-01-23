using LibraryManagementSystem.Server.Data.Models;
using LibraryManagementSystem.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController: ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;

        public CategoryController(CategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _categoryRepository.GetAllCategories();
            return Ok(categories);
        }
        [HttpPost]
        public IActionResult AddCategory(Category category)
        {
            _categoryRepository.AddCategory(category);
            return CreatedAtAction(nameof(GetAllCategories), null);
        }   
    }
}
