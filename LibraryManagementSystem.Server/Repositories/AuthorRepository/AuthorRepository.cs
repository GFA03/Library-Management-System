using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Repositories.AuthorRepository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly List<Author> _authors = new List<Author>();

        public List<Author> GetAllAuthors()
        {
            return _authors;
        }

        public void AddAuthor(Author author)
        {
            _authors.Add(author);
        }
    }
}
