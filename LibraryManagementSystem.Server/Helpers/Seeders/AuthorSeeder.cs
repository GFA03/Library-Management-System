using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class AuthorSeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public AuthorSeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialAuthors()
        {
            if (!_dbContext.Authors.Any())
            {
                var authors = new List<Author>
                {
                    new Author
                    {
                        Id = new Guid("7a3b77d1-d0d5-4de8-b3f4-ba4319a3e57b"),
                        FirstName = "J.K.",
                        LastName = "Rowling",
                        Nationality = "British"
                    },
                    new Author
                    {
                        Id = new Guid("874dfae4-b1d1-4e1a-b33a-147d8c3cd28d"),
                        FirstName = "George",
                        LastName = "Orwell",
                        Nationality = "British"
                    },
                    new Author
                    {
                        Id = new Guid("72390ad3-b9e3-4f79-bd3b-f8fbe0a19388"),
                        FirstName = "Isaac",
                        LastName = "Asimov",
                        Nationality = "American"
                    },
                    new Author
                    {
                        Id = new Guid("62f28f86-9e19-4b52-8351-b8c3eaf076bd"),
                        FirstName = "Agatha",
                        LastName = "Christie",
                        Nationality = "British"
                    },
                    new Author
                    {
                        Id = new Guid("b31d02f2-e1c3-46d9-a5b5-8ed53e5e9a11"),
                        FirstName = "Michelle",
                        LastName = "Obama",
                        Nationality = "American"
                    }
                };

                _dbContext.Authors.AddRange(authors);
                _dbContext.SaveChanges();
            }
        }
    }
}
