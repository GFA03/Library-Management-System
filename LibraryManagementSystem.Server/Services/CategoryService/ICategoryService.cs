using LibraryManagementSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoriesByNameAsync(string Name);
        Task AddCategory(Category category);
        Task UpdateCategory(int id, Category category);
        Task RemoveCategory(int index);
    }
}
