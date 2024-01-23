using LibraryManagementSystem.Server.Models.Base;
using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Models
{
    public class Author : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }

        public Guid? PreferredCategoryId { get; set; }
        public Category? PreferredCategory { get; set; }

        public ICollection<Book> Books { get; set; }

    }
}
