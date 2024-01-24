using LibraryManagementSystem.Server.Models.Base;

namespace LibraryManagementSystem.Server.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Author> PreferredAuthors { get; set; }

        public ICollection<BookCategory> Books { get; set; } = [];
    }
}
