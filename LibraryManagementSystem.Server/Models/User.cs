using LibraryManagementSystem.Server.Models.Base;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementSystem.Server.Models
{
    public class User : IdentityUser<Guid>
    {
        // A user can borrow books
        public ICollection<Book> Books { get; set; }
    }
}
