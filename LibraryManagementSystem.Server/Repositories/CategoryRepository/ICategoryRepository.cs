using LibraryManagementSystem.Server.Models.Category;

namespace LibraryManagementSystem.Server.Repositories.CategoryRepository
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();

        List<Category> GetCategoriesByName(string Name);

        void AddCategory(Category category);

        void RemoveCategory(int index);
    }
}
