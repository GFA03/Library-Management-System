using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Server.Models.DTOs.UserDTO
{
    public class SignUpDTO
    {
        [Required(ErrorMessage = "Email required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Username required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password required")]
        public string Password { get; set; }
    }
}
