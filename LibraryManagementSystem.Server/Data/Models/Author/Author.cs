using LibraryManagementSystem.Server.Data.Models.Base;

namespace LibraryManagementSystem.Server.Data.Models.Author
{
    public class Author : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }

    }
}
