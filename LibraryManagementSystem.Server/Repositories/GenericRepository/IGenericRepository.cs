using LibraryManagementSystem.Server.Models.Base;

namespace LibraryManagementSystem.Server.Repositories.GenericRepository
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        Task CreateAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        bool DeleteById(Guid id);
        Task<bool> SaveAsync();

    }
}
