using LibraryManagementSystem.Server.Data.Models.Author;

namespace LibraryManagementSystem.Server.Repositories.AuthorRepository
{
    public interface IAuthorRepository
    {

        List<Author> GetAllAuthors();

        void AddAuthor(Author author);
            
    }
}
