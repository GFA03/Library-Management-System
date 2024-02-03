using LibraryManagementSystem.Server.Helpers.Responses;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.GenericRepository;

namespace LibraryManagementSystem.Server.Repositories.BookRepository
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        List<Book> GetBooksByTitle(string title);

        void DecrementAvailableCopies(Guid bookId);

        void IncrementAvailableCopies(Guid bookId);
    }
}
