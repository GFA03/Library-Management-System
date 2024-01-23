using LibraryManagementSystem.Server.Data.Models.Book;

namespace LibraryManagementSystem.Server.Repositories.BookRepository
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();

        void AddBook(Book book);
    }
}
