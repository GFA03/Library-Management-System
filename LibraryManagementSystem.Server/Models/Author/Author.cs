using LibraryManagementSystem.Server.Models.Base;

namespace LibraryManagementSystem.Server.Models.Author
{
    public class Author : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }

    }
}
