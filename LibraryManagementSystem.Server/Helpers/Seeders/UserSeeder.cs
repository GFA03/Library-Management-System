using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class UserSeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public UserSeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialUsers()
        {
            if (!_dbContext.Users.Any())
            {
                var hasher = new PasswordHasher<User>();
                var users = new List<User>
            {
                new User()
                {
                    Id = new Guid("439c82bf-f8cd-4300-a467-03a1f85a6d63"),
                    UserName = "GFA",
                    NormalizedUserName = "GFA".ToUpper(),
                    EmailConfirmed = true,
                    Email = "florinalexandru302003@gmail.com",
                    NormalizedEmail = "florinalexandru302003@gmail.com".ToUpper(),
                    PasswordHash = hasher.HashPassword(null,"test1234"),
                    SecurityStamp = Guid.NewGuid().ToString(),
                },
                new User()
                {
                    Id = new Guid("310a3aac-1bd8-43d5-ba39-d20f15a7b5b1"),
                    UserName = "Alexco2003",
                    NormalizedUserName = "Alexco2003".ToUpper(),
                    Email = "alexco2003@gmail.com",
                    EmailConfirmed = true,
                    NormalizedEmail = "alexco2003@gmail.com".ToUpper(),
                    PasswordHash = hasher.HashPassword(null,"test4321"),
                    SecurityStamp = Guid.NewGuid().ToString(),
                },
                new User()
                {
                    Id = new Guid("34b460b7-936a-4293-bde2-a835a99f2e52"),
                    UserName = "CraniaxCipri",
                    NormalizedUserName = "CraniaxCipri".ToUpper(),
                    Email = "craniaxciprisharedaccount@gmail.com",
                    EmailConfirmed = true,
                    NormalizedEmail = "craniaxciprisharedaccount@gmail.com".ToUpper(),
                    PasswordHash=hasher.HashPassword(null,"testtest"),
                    SecurityStamp = Guid.NewGuid().ToString()
                }
            };

                _dbContext.Users.AddRange(users);
                _dbContext.SaveChanges();
            }
        }
    }
}
