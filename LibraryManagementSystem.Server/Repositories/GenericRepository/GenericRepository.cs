using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models.Base;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Server.Repositories.GenericRepository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected readonly LibraryDatabaseContext _databaseContext;
        protected readonly DbSet<T> _table;

        public GenericRepository(LibraryDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
            _table = _databaseContext.Set<T>();
        }

        public async Task CreateAsync(T entity)
        {
            await _table.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _table.Remove(entity);
        }

        public bool DeleteById(Guid id)
        {
            var entity = _table.Find(id);
            if (entity == null) return false;
            _table.Remove(entity);
            return true;
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _table.AsNoTracking().ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _table.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> SaveAsync()
        {
            return await _databaseContext.SaveChangesAsync() > 0; 
        }

        public void Update(T entity)
        {
            _table.Update(entity);
        }
    }
}
