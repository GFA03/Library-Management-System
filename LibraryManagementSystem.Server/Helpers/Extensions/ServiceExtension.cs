using LibraryManagementSystem.Server.Repositories.AuthorRepository;
using LibraryManagementSystem.Server.Repositories.BookRepository;
using LibraryManagementSystem.Server.Repositories.CategoryRepository;
using LibraryManagementSystem.Server.Services.AuthorService;
using LibraryManagementSystem.Server.Services.BookService;
using LibraryManagementSystem.Server.Services.CategoryService;

namespace LibraryManagementSystem.Server.Helpers.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IBookRepository, BookRepository>();
            services.AddTransient<IAuthorRepository, AuthorRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IBookService, BookService>();
            services.AddTransient<IAuthorService, AuthorService>();
            services.AddTransient<ICategoryService, CategoryService>();

            return services;
        }
    }
}
