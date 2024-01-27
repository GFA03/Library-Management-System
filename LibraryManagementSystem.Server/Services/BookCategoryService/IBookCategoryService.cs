using LibraryManagementSystem.Server.Models.DTOs.BookCategoriesDTO;

namespace LibraryManagementSystem.Server.Services.BookCategoryService
{
    public interface IBookCategoryService
    {
        Task<List<BookCategoryDTO>> GetAllBookCategories();
        Task CreateBookCategory(BookCategoryDTO bookCategoryDTO);
        Task<bool> RemoveBookCategory(Guid bookId, Guid categoryId);

    }
}
