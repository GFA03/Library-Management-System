using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class CategorySeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public CategorySeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialCategories()
        {
            if (!_dbContext.Categories.Any())
            {
                var categories = new List<Category>
            {
                    new Category
                    {
                        Id = new Guid("72390ad3-b9e3-4f79-bd3b-f8fbe0a19388"),
                        CreatedDate = DateTime.Now,
                        LastModified = DateTime.Now,
                        Name = "Fiction",
                        Description = "Books based on imaginative concepts."
                    },
                    new Category
                    {
                        Id = new Guid("62f28f86-9e19-4b52-8351-b8c3eaf076bd"),
                        CreatedDate = DateTime.Now,
                        LastModified = DateTime.Now,
                        Name = "Non-Fiction",
                        Description = "Books based on real events and facts."
                    },
                    new Category
                    {
                        Id = new Guid("b31d02f2-e1c3-46d9-a5b5-8ed53e5e9a11"),
                        CreatedDate = DateTime.Now,
                        LastModified = DateTime.Now,
                        Name = "Science Fiction",
                        Description = "Books with futuristic and scientific themes."
                    },
                    new Category
                    {
                        Id = new Guid("7a3b77d1-d0d5-4de8-b3f4-ba4319a3e57b"),
                        CreatedDate = DateTime.Now,
                        LastModified = DateTime.Now,
                        Name = "Mystery",
                        Description = "Books focused on solving a mystery or crime."
                    },
                    new Category
                    {
                        Id = new Guid("874dfae4-b1d1-4e1a-b33a-147d8c3cd28d"),
                        CreatedDate = DateTime.Now,
                        LastModified = DateTime.Now,
                        Name = "Biography",
                        Description = "Books depicting the life of a real person."
                    }
                };

                _dbContext.Categories.AddRange(categories);
                _dbContext.SaveChanges();
            }
        }
    }
}
