using LibraryManagementSystem.Server.Models.Base;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementSystem.Server.Models
{
    public class User : IdentityUser<Guid>
    {
        // a user can borrow a book
        public Guid? BookId {  get; set; }
        public Book? Book { get; set; }
    }
}
