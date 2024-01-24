using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.GenericRepository;


namespace LibraryManagementSystem.Server.Repositories.CategoryRepository
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(LibraryDatabaseContext databaseContext) : base(databaseContext)
        {
        }
        public List<Category> GetAllCategoriesByName(string categoryName)
        {
            IQueryable<Category> query = _table;
            if(!string.IsNullOrEmpty(categoryName))
            {
                var normalizedName = categoryName.ToLower();
                query = query.Where(category => category.Name.ToLower().Contains(normalizedName));
            }
            return query.ToList();
        }
    }
}
