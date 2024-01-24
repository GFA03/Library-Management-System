using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.GenericRepository;

namespace LibraryManagementSystem.Server.Repositories.CategoryRepository
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        List<Category> GetAllCategoriesByName(string categoryName);
    }
}
