using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.CategoryRepository;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
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

        [HttpGet("name")]
        public IActionResult GetCategoriesByName(string Name)
        {
            var categories = _categoryRepository.GetCategoriesByName(Name);
            return Ok(categories);
        }

        [HttpPost]
        public IActionResult AddCategory(Category category)
        {
            _categoryRepository.AddCategory(category);
            return CreatedAtAction(nameof(GetAllCategories), null);
        }

        [HttpDelete]
        public IActionResult RemoveCategory(int index)
        {
            _categoryRepository.RemoveCategory(index);
            return CreatedAtAction(nameof(GetAllCategories), null);
        }

    }
}
