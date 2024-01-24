using LibraryManagementSystem.Server.Data;
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
    }
}
