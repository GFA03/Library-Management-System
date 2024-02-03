namespace LibraryManagementSystem.Server.Services.UserBookService
{
    public interface IUserBookService
    {
        Task LoanBook(string userId, Guid bookId);
        Task ReturnBook(string userId);
        Task SaveAsync();
    }
}
