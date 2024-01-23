using LibraryManagementSystem.Server.Models.Category;

namespace LibraryManagementSystem.Server.Repositories.CategoryRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly List<Category> _categories = new List<Category>();
        public List<Category> GetAllCategories()
        {
            return _categories;
        }

        public List<Category> GetCategoriesByName(string Name)
        {
            return _categories.FindAll(c => c.Name.ToLower().Contains(Name.ToLower()));
        }

        public void AddCategory(Category category)
        {
            _categories.Add(category);
        }

        public void RemoveCategory(int index)
        {
            if (index < 0 || index >= _categories.Count)
            {
                throw new ArgumentOutOfRangeException("index");
            }
            _categories.RemoveAt(index);
        }
    }
}
