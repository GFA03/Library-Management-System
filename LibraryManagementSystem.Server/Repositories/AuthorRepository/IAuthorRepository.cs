using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Repositories.AuthorRepository
{
    public interface IAuthorRepository
    {

        List<Author> GetAllAuthors();

        void AddAuthor(Author author);
            
    }
}
