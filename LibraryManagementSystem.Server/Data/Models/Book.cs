namespace LibraryManagementSystem.Server.Data.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public DateTime PublicationDate {  get; set; }
        public int AvailableCopies { get; set; }
        public string CoverImage { get; set; }

    }
}
