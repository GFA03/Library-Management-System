using AutoMapper;
using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.BookRepository;
using LibraryManagementSystem.Server.Repositories.UserRepository;

namespace LibraryManagementSystem.Server.Services.UserBookService
{
    public class UserBookService : IUserBookService
    {
        private readonly LibraryDatabaseContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public UserBookService(LibraryDatabaseContext dbContext, IUserRepository userRepository, IBookRepository bookRepository, IMapper mapper)
        {
            _dbContext = dbContext;
            _userRepository = userRepository;
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        public async Task LoanBook(string userId, Guid bookId)
        {
            User? user = await _userRepository.GetUserById(new Guid(userId));
            if(user == null)
            {
                throw new Exception("User not found!");
            }

            if(user.BookId != null)
            {
                throw new Exception("User has already loaned a book! Please return it first, then you can loan another book!");
            }

            Book? book = await _bookRepository.GetByIdAsync(bookId);
            if(book == null)
            {
                throw new Exception("Book not found!");
            }

            if(book.AvailableCopies <= 0)
            {
                throw new Exception("Book doesn't have any available copies!");
            }

            book.AvailableCopies--;
            _bookRepository.Update(book);

            user.BookId = bookId;

            await _userRepository.Update(user);
            await SaveAsync();
        }

        public async Task ReturnBook(string userId)
        {
            User? user = await _userRepository.GetUserById(new Guid(userId));
            if (user == null)
            {
                throw new Exception("User not found!");
            }

            if (user.BookId == null)
            {
                throw new Exception("User hasn't loaned a book yet!");
            }


            Book? book = user.BookId != null ? await _bookRepository.GetByIdAsync(user.BookId.Value) : null;

            book.AvailableCopies++;
            _bookRepository.Update(book);

            user.Book = null;
            user.BookId = null;

            await _userRepository.Update(user);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
