using LibraryManagementSystem.Server.Data.Models;

namespace LibraryManagementSystem.Server.Repositories
{
    public class AuthorRepository
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
