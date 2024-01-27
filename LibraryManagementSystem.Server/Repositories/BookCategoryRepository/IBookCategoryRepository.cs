using LibraryManagementSystem.Server.Models;

namespace LibraryManagementSystem.Server.Repositories.BookCategoryRepository
{
    public interface IBookCategoryRepository
    {
        Task<List<BookCategory>> GetAllAsync();

        Task CreateAsync(BookCategory bookCategory);

        void Delete(BookCategory bookCategory);

        Task<bool> DeleteById(Guid bookId, Guid categoryId);

        Task<bool> SaveAsync();
    }
}
