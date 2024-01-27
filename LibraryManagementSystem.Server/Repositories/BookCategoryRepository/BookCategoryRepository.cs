using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.BookCategoriesDTO;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Server.Repositories.BookCategoryRepository
{
    public class BookCategoryRepository : IBookCategoryRepository
    {
        private readonly LibraryDatabaseContext _dbContext;
        private readonly DbSet<BookCategory> _table;

        public BookCategoryRepository(LibraryDatabaseContext dbContext)
        {
            _dbContext = dbContext;
            _table = _dbContext.Set<BookCategory>();
        }

        public Task<List<BookCategory>> GetAllAsync() 
        {
            return _table.AsNoTracking().ToListAsync();
        }

        public async Task CreateAsync(BookCategory bookCategory)
        {
            await _table.AddAsync(bookCategory);
        }

        public void Delete(BookCategory bookCategory)
        {
            _table.Remove(bookCategory);
        }

        public async Task<bool> DeleteById(Guid bookId, Guid categoryId)
        {
            var existingRelationship = await _table
           .FirstOrDefaultAsync(bc => bc.BookId == bookId && bc.CategoryId == categoryId);

            if (existingRelationship != null)
            {
                _table.Remove(existingRelationship);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
        public async Task<bool> SaveAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
