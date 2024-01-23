using LibraryManagementSystem.Server.Models.Base;

namespace LibraryManagementSystem.Server.Models
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; }
        public DateTime PublicationDate { get; set; }
        public int AvailableCopies { get; set; }
        public string CoverImage { get; set; }

        public Guid AuthorId {  get; set; }
        public Author Author { get; set; }

        public ICollection<BookCategory> Categories { get; set; }

    }
}
