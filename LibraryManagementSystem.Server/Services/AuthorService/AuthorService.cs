using AutoMapper;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.AuthorDTO;
using LibraryManagementSystem.Server.Models.DTOs.CategoryDTO;
using LibraryManagementSystem.Server.Repositories.AuthorRepository;

namespace LibraryManagementSystem.Server.Services.AuthorService
{
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorService(IAuthorRepository authorRepository, IMapper mapper)
        {
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        public async Task<List<AuthorDTO>> GetAllAuthors()
        {
            var authors = await _authorRepository.GetAllAsync();
            return _mapper.Map<List<AuthorDTO>>(authors);
        }
        public List<AuthorDTO> GetAuthorsByName(string Name)
        {
            var authors = _authorRepository.GetAuthorListByName(Name);
            return _mapper.Map<List<AuthorDTO>>(authors);
        }
        public async Task CreateAuthor(CreateAuthorDTO AuthorDto)
        {
            await _authorRepository.CreateAsync(_mapper.Map<Author>(AuthorDto));
            await _authorRepository.SaveAsync();
        }
        public async Task UpdateAuthor(UpdateAuthorDTO AuthorDto)
        {
            var author = _mapper.Map<Author>(AuthorDto);
            _authorRepository.Update(author);
            await _authorRepository.SaveAsync();
        }
        public async Task<bool> RemoveAuthor(Guid id)
        {
            _authorRepository.DeleteById(id);
            return await _authorRepository.SaveAsync();
        }
    }
}
