using LibraryManagementSystem.Server.Models.Book;

namespace LibraryManagementSystem.Server.Repositories.BookRepository
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();

        void AddBook(Book book);
    }
}
