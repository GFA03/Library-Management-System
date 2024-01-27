using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.AuthorDTO;
using LibraryManagementSystem.Server.Models.DTOs.BookCategoriesDTO;
using LibraryManagementSystem.Server.Models.DTOs.BookDTO;
using LibraryManagementSystem.Server.Models.DTOs.CategoryDTO;

namespace LibraryManagementSystem.Server.Helpers
{
    public class MapperProfile : AutoMapper.Profile
    {
        public MapperProfile() {

            CreateMap<Author, AuthorDTO>();
            CreateMap<AuthorDTO, Author>();

            CreateMap<Book, BookDTO>();
            CreateMap<BookDTO, Book>();

            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>();

            CreateMap<BookCategoryDTO, BookCategory>();
            CreateMap<BookCategory, BookCategoryDTO>();

            CreateMap<CreateAuthorDTO, Author>()
                .ForMember(a => a.Id, opt =>
                    opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(a => a.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now))
                .ForMember(a => a.CreatedDate, opt =>
                    opt.MapFrom(src => DateTime.Now));

            CreateMap<CreateBookDTO, Book>()
                .ForMember(b => b.Id, opt =>
                    opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(b => b.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now))
                .ForMember(b => b.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now));

            CreateMap<CreateCategoryDTO, Category>()
                .ForMember(c => c.Id, opt =>
                    opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(c => c.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now))
                .ForMember(c => c.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now));

            CreateMap<UpdateAuthorDTO, Author>()
                .ForMember(a => a.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now));

            CreateMap<UpdateBookDTO, Book>()
                .ForMember(b => b.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now));

            CreateMap<UpdateCategoryDTO, Category>()
                .ForMember(c => c.LastModified, opt =>
                    opt.MapFrom(src => DateTime.Now));
        }
    }
}
