namespace LibraryManagementSystem.Server.Models.DTOs.UserDTO
{
    public class ResponseLoginDTO
    {
        public Guid Id { get; set; }
        public IList<string> Role {  get; set; }
    }
}
