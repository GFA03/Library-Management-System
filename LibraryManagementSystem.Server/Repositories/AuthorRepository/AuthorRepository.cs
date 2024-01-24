using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.GenericRepository;
using System.Linq;


namespace LibraryManagementSystem.Server.Repositories.AuthorRepository
{
    public class AuthorRepository : GenericRepository<Author>, IAuthorRepository
    {
        public AuthorRepository(LibraryDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public List<Author> GetAuthorListByName(string name) 
        {
            IQueryable<Author> query = _table;
            if (!string.IsNullOrEmpty(name))
            {
                var normalizedName = name.ToLower();
                query = query.Where(author =>
                    (author.FirstName + " " + author.LastName).ToLower().Contains(normalizedName)
                );
            }
            return query.ToList();
        }
    }
}
