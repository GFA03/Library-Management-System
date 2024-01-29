namespace LibraryManagementSystem.Server.Models.DTOs.UserDTO
{
    public class UserUpdateDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
