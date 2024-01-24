using LibraryManagementSystem.Server.Models.Base;
using LibraryManagementSystem.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Server.Models
{
    [Table("Authors")]
    public class Author : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }

        [ForeignKey(nameof(Category))]
        public Guid? PreferredCategoryId { get; set; }
        public Category? PreferredCategory { get; set; }

        public ICollection<Book> Books { get; set; } = [];

    }
}
