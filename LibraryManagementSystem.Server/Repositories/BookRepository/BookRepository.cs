using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Helpers.Responses;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.GenericRepository;


namespace LibraryManagementSystem.Server.Repositories.BookRepository
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(LibraryDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public List<Book> GetBooksByTitle(string title)
        {
            IQueryable<Book> query = _table;
            if (!string.IsNullOrEmpty(title))
            {
                var normalizedTitle = title.ToLower();
                query = query.Where(book => book.Title.ToLower().Contains(normalizedTitle));
            }
            return query.ToList();
        }

        public void DecrementAvailableCopies(Guid bookId)
        {
            var query = _table;
            var book = _table.Find(bookId);
            if (book != null)
            {


                if (book.AvailableCopies <= 0)
                {
                    throw new Exception("Book not available at the moment!");
                }

                if (book.AvailableCopies > 0)
                {
                    book.AvailableCopies -= 1;
                    _table.Update(book);
                }
            }
            throw new Exception("Book not found!");
        }

        public void IncrementAvailableCopies(Guid bookId)
        {
            var query = _table;
            var book = _table.Find(bookId);
            if (book != null)
            {
                book.AvailableCopies += 1;
                _table.Update(book);
            }
            throw new Exception("Book not found!");
        }
    }
}
