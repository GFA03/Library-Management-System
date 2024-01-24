namespace LibraryManagementSystem.Server.Models.DTOs.AuthorDTO
{
    public class CreateAuthorDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Nationality { get; set; }
    }
}
