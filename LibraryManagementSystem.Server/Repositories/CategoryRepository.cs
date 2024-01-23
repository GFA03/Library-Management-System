using LibraryManagementSystem.Server.Data.Models;

namespace LibraryManagementSystem.Server.Repositories
{
    public class CategoryRepository
    {
        private readonly List<Category> _categories = new List<Category>();
        public List<Category> GetAllCategories()
        {
            return _categories;
        }

        public void AddCategory(Category category)
        {
            _categories.Add(category);
        }
    }
}
