using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Server.Models
{
    [Table("BookCategories")]
    [PrimaryKey(nameof(BookId), nameof(CategoryId))]
    [Index(nameof(BookId))]
    [Index(nameof(CategoryId))]
    public class BookCategory
    {
        //TODO: See if it is BookId or just Book !!!
        [ForeignKey(nameof(BookId))]
        public Guid BookId { get; set; }
        public Book Book { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
