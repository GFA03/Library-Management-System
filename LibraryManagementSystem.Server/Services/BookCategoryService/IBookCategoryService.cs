using LibraryManagementSystem.Server.Models.DTOs.BookCategoriesDTO;

namespace LibraryManagementSystem.Server.Services.BookCategoryService
{
    public interface IBookCategoryService
    {
        Task<List<BookCategoryDTO>> GetAllBookCategories();
        Task CreateBook(BookCategoryDTO bookCategoryDTO);
        Task<bool> RemoveBook(Guid bookId, Guid categoryId);

    }
}
