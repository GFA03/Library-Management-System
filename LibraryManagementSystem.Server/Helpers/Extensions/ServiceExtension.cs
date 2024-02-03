using LibraryManagementSystem.Server.Helpers.Seeders;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Repositories.AuthorRepository;
using LibraryManagementSystem.Server.Repositories.BookCategoryRepository;
using LibraryManagementSystem.Server.Repositories.BookRepository;
using LibraryManagementSystem.Server.Repositories.CategoryRepository;
using LibraryManagementSystem.Server.Repositories.UserRepository;
using LibraryManagementSystem.Server.Services.AuthorService;
using LibraryManagementSystem.Server.Services.BookCategoryService;
using LibraryManagementSystem.Server.Services.BookService;
using LibraryManagementSystem.Server.Services.CategoryService;
using LibraryManagementSystem.Server.Services.UserBookService;
using LibraryManagementSystem.Server.Services.UserService;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementSystem.Server.Helpers.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IBookRepository, BookRepository>();
            services.AddTransient<IAuthorRepository, AuthorRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IBookCategoryRepository, BookCategoryRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddScoped<UserManager<User>>();
            services.AddScoped<RoleManager<IdentityRole<Guid>>>();

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IBookService, BookService>();
            services.AddTransient<IAuthorService, AuthorService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IBookCategoryService, BookCategoryService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserBookService, UserBookService>();

            return services;
        }

        public static IServiceCollection AddSeeders(this IServiceCollection services)
        {
            services.AddTransient<AuthorSeeder>();
            services.AddTransient<CategorySeeder>();
            services.AddTransient<BookSeeder>();
            services.AddTransient<UserSeeder>();
            services.AddTransient<RoleSeeder>();
            services.AddTransient<UserRoleSeeder>();
            services.AddTransient<BookCategorySeeder>();

            return services;
        }
    }
}
