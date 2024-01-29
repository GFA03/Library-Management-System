using LibraryManagementSystem.Server.Data;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementSystem.Server.Helpers.Seeders
{
    public class UserRoleSeeder
    {
        private readonly LibraryDatabaseContext _dbContext;

        public UserRoleSeeder(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedInitialUsersRoles()
        {
            if (!_dbContext.UserRoles.Any())
            {
                var userRoles = new List<IdentityUserRole<Guid>>
            {
                new IdentityUserRole<Guid>()
                {
                    RoleId = new Guid("3d1b9f9b-55b8-46b2-b9d3-69a112e2085f"),
                    UserId = new Guid("439c82bf-f8cd-4300-a467-03a1f85a6d63"),
                },
                new IdentityUserRole<Guid>()
                {
                    RoleId = new Guid("d67fe3af-0d25-4757-932c-e53205271884"),
                    UserId = new Guid("310a3aac-1bd8-43d5-ba39-d20f15a7b5b1"),
                },
                new IdentityUserRole<Guid>()
                {
                    RoleId = new Guid("d67fe3af-0d25-4757-932c-e53205271884"),
                    UserId = new Guid("34b460b7-936a-4293-bde2-a835a99f2e52"),
                }
            };

                _dbContext.UserRoles.AddRange(userRoles);
                _dbContext.SaveChanges();
            }
        }
    }
}
