using AutoMapper;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.BookDTO;
using LibraryManagementSystem.Server.Repositories.BookRepository;

namespace LibraryManagementSystem.Server.Services.BookService
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BookService(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        public async Task<List<BookDTO>> GetAllBooks()
        {
            List<Book> books = await _bookRepository.GetAllAsync();
            return _mapper.Map<List<BookDTO>>(books);
        }

        public List<BookDTO> GetBooksByTitle(string title)
        {
            return _mapper.Map<List<BookDTO>>(_bookRepository.GetBooksByTitle(title));
        }

        public async Task CreateBook(CreateBookDTO bookDto)
        {
            await _bookRepository.CreateAsync(_mapper.Map<Book>(bookDto));
            await _bookRepository.SaveAsync();
        }

        public async Task UpdateBook(UpdateBookDTO bookDto)
        {
            var book = _mapper.Map<Book>(bookDto);
            _bookRepository.Update(book);
            await _bookRepository.SaveAsync();
        }

        public async Task<bool> RemoveBook(Guid id)
        {
            _bookRepository.DeleteById(id);
            return await _bookRepository.SaveAsync();
        }
    }
}
