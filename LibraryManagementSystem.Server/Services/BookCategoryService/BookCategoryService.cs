using AutoMapper;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.BookCategoriesDTO;
using LibraryManagementSystem.Server.Repositories.BookCategoryRepository;

namespace LibraryManagementSystem.Server.Services.BookCategoryService
{
    public class BookCategoryService : IBookCategoryService
    {
        private readonly IBookCategoryRepository _bookCategoryRepository;
        private readonly IMapper _mapper;

        public BookCategoryService(IBookCategoryRepository bookCategoryRepository, IMapper mapper)
        {
            _bookCategoryRepository = bookCategoryRepository;
            _mapper = mapper;
        }
        public async Task<List<BookCategoryDTO>> GetAllBookCategories()
        {
            List<BookCategory> bookCategories = await _bookCategoryRepository.GetAllAsync();
            return _mapper.Map<List<BookCategoryDTO>>(bookCategories);
        }

        public async Task CreateBookCategory(BookCategoryDTO bookCategoryDTO)
        {
            await _bookCategoryRepository.CreateAsync(_mapper.Map<BookCategory>(bookCategoryDTO));
            await _bookCategoryRepository.SaveAsync();
        }


        public Task<bool> RemoveBookCategory(Guid bookId, Guid categoryId)
        {
            return _bookCategoryRepository.DeleteById(bookId, categoryId);
        }
    }
}
