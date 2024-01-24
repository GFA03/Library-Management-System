using LibraryManagementSystem.Server.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Server.Models
{
    [Table("Books")]
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string? Condition { get; set; }
        public int PublicationDate { get; set; }
        public int AvailableCopies { get; set; }
        public string? CoverImage { get; set; }

        [ForeignKey(nameof(Author))]
        public Guid? AuthorId {  get; set; }
        public Author? Author { get; set; }

        public ICollection<BookCategory> Categories { get; set; } = [];

    }
}
