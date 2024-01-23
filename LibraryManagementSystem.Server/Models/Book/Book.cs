using LibraryManagementSystem.Server.Models.Base;

namespace LibraryManagementSystem.Server.Models.Book
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; }
        public DateTime PublicationDate { get; set; }
        public int AvailableCopies { get; set; }
        public string CoverImage { get; set; }

    }
}
