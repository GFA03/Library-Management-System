using LibraryManagementSystem.Server.Models.DTOs.BookDTO;

namespace LibraryManagementSystem.Server.Services.BookService
{
    public interface IBookService
    {
        Task<List<BookDTO>> GetAllBooks();
        List<BookDTO> GetBooksByTitle(string title);
        Task CreateBook(CreateBookDTO bookDTO);
        Task UpdateBook(UpdateBookDTO bookDTO);
        Task<bool> RemoveBook(Guid id);
    }
}
