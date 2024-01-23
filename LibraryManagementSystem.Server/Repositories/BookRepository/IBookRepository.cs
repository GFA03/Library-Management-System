using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Repositories.BookRepository
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();

        void AddBook(Book book);
    }
}
