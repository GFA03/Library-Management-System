using LibraryManagementSystem.Server.Models.Book;

namespace LibraryManagementSystem.Server.Repositories.BookRepository
{
    public class BookRepository : IBookRepository
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
