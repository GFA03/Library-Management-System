using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.CategoryRepository;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public Task AddCategory(Category category)
        {
            _categoryRepository.AddCategory(category);
            return Task.CompletedTask;
        }

        public Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetCategoriesByNameAsync(string Name)
        {
            throw new NotImplementedException();
        }

        public Task RemoveCategory(int index)
        {
            throw new NotImplementedException();
        }

        public Task UpdateCategory(int id, Category category)
        {
            throw new NotImplementedException();
        }
    }
}
