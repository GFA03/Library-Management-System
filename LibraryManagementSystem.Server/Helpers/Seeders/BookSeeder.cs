using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class BookSeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public BookSeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialBooks()
        {
            if (!_dbContext.Books.Any())
            {
                var book1 = new Book
                {
                    Id = new Guid("e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5"),
                    Title = "Harry Potter and the Sorcerer's Stone",
                    Language = "English",
                    Description = "The first book in the Harry Potter series",
                    PublicationDate = 1997,
                    AvailableCopies = 3,
                    CoverImage = "harry_potter.jpg",
                    AuthorId = new Guid("7a3b77d1-d0d5-4de8-b3f4-ba4319a3e57b")
                };

                var book2 = new Book
                {
                    Id = new Guid("d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4"),
                    Title = "1984",
                    Language = "English",
                    Description = "A dystopian novel by George Orwell",
                    PublicationDate = 1949,
                    AvailableCopies = 5,
                    CoverImage = "1984.jpg",
                    AuthorId = new Guid("874dfae4-b1d1-4e1a-b33a-147d8c3cd28d")
                };

                var book3 = new Book
                {
                    Id = new Guid("b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3"),
                    Title = "Foundation",
                    Language = "English",
                    Description = "A science fiction novel by Isaac Asimov",
                    PublicationDate = 1951,
                    AvailableCopies = 6,
                    CoverImage = "foundation.jpg",
                    AuthorId = new Guid("72390ad3-b9e3-4f79-bd3b-f8fbe0a19388")
                };

                var book4 = new Book
                {
                    Id = new Guid("a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2"),
                    Title = "Murder on the Orient Express",
                    Language = "English",
                    Description = "A detective novel by Agatha Christie",
                    PublicationDate = 1934,
                    AvailableCopies = 8,
                    CoverImage = "murder_on_the_orient_express.jpg",
                    AuthorId = new Guid("62f28f86-9e19-4b52-8351-b8c3eaf076bd")
                };

                var book5 = new Book
                {
                    Id = new Guid("c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1"),
                    Title = "Becoming",
                    Language = "English",
                    Description = "An autobiography by Michelle Obama",
                    PublicationDate = 2018,
                    AvailableCopies = 5,
                    CoverImage = "becoming.jpg",
                    AuthorId = new Guid("b31d02f2-e1c3-46d9-a5b5-8ed53e5e9a11")
                };

                var books = new List<Book> { book1, book2, book3, book4, book5 };

                _dbContext.Books.AddRange(books);
                _dbContext.SaveChanges();
            }
        }
    }
}
