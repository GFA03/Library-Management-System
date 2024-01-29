namespace LibraryManagementSystem.Server.Helpers.Responses
{
    public class CheckLogin
    {
        public bool IsLoggedIn { get; set; }
        public string? UserId { get; set; }
    }
}
