using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class BookCategorySeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public BookCategorySeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialBookCategories()
        {
            if (!_dbContext.BookCategories.Any())
            {
                var bookCategory1 = new BookCategory
                {
                    BookId = new Guid("c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1"),
                    CategoryId = new Guid("874dfae4-b1d1-4e1a-b33a-147d8c3cd28d")
                };

                var bookCategory2 = new BookCategory
                {
                    BookId = new Guid("a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2"),
                    CategoryId = new Guid("7a3b77d1-d0d5-4de8-b3f4-ba4319a3e57b")
                };

                var bookCategory3 = new BookCategory
                {
                    BookId = new Guid("b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3"),
                    CategoryId = new Guid("b31d02f2-e1c3-46d9-a5b5-8ed53e5e9a11")
                };

                var bookCategory4 = new BookCategory
                {
                    BookId = new Guid("d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4"),
                    CategoryId = new Guid("72390ad3-b9e3-4f79-bd3b-f8fbe0a19388")
                };

                var bookCategory5 = new BookCategory
                {
                    BookId = new Guid("e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5"),
                    CategoryId = new Guid("72390ad3-b9e3-4f79-bd3b-f8fbe0a19388")
                };

                var bookCategories = new List<BookCategory>
                {
                    bookCategory1, bookCategory2, bookCategory3, bookCategory4, bookCategory5
                };

                _dbContext.BookCategories.AddRange(bookCategories);
                _dbContext.SaveChanges();
            }
        }
    }
}
