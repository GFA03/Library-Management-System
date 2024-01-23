using LibraryManagementSystem.Server.Data.Models;

namespace LibraryManagementSystem.Server.Repositories
{
    public class BookRepository
    {
        private readonly List<Book> _books = new List<Book>();

        public List<Book> GetAllBooks()
        {
            return _books;
        }

        public void AddBook(Book book)
        {
            _books.Add(book);
        }
    }
}
