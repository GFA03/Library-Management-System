using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.GenericRepository;

namespace LibraryManagementSystem.Server.Repositories.AuthorRepository
{
    public interface IAuthorRepository : IGenericRepository<Author>
    {
        List<Author> GetAuthorListByName(string name);
            
    }
}
