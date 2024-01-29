using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Server.Models.DTOs.UserDTO
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
