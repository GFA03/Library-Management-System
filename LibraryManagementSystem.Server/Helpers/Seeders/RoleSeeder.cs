using LibraryManagementSystem.Server.Data;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class RoleSeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public RoleSeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialRoles()
        {
            if (!_dbContext.Roles.Any())
            {
                var roles = new List<IdentityRole<Guid>>()
            {
                new IdentityRole<Guid>()
                {
                    Id = new Guid("3d1b9f9b-55b8-46b2-b9d3-69a112e2085f"),
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper()
                },
                new IdentityRole<Guid>()
                {
                    Id = new Guid("d67fe3af-0d25-4757-932c-e53205271884"),
                    Name = "User",
                    NormalizedName = "User".ToUpper()
                },
            };

                _dbContext.AddRange(roles);
                _dbContext.SaveChanges();
            }
        }
    }
}
