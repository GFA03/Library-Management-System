using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.AuthorDTO;

namespace LibraryManagementSystem.Server.Services.AuthorService
{
    public interface IAuthorService
    {
        Task<List<AuthorDTO>> GetAllAuthors();
        List<AuthorDTO> GetAuthorsByName(string Name);
        Task CreateAuthor(CreateAuthorDTO AuthorDto);
        Task UpdateAuthor(UpdateAuthorDTO AuthorDto);
        Task<bool> RemoveAuthor(Guid id);


    }
}
