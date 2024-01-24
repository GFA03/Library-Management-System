using LibraryManagementSystem.Server.Models.DTOs.CategoryDTO;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetAllCategories();
        List<CategoryDTO> GetCategoriesByName(string Name);
        Task CreateCategory(CreateCategoryDTO CategoryDto);
        Task UpdateCategory(UpdateCategoryDTO CategoryDto);
        Task<bool> RemoveCategory(Guid id);
    }
}
