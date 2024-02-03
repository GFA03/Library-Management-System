using LibraryManagementSystem.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Server.Data
{
    public class LibraryDatabaseContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }

        public DbSet<User> Users { get; set; }

        public LibraryDatabaseContext(DbContextOptions<LibraryDatabaseContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Author - Book (One-to-Many)
            modelBuilder.Entity<Author>()
                .HasMany(author => author.Books)
                .WithOne(book => book.Author)
                .HasForeignKey(book => book.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Book (Many-to-One)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Book)
                .WithMany(b => b.Users)
                .HasForeignKey(u => u.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            // Author - Category (Many-to-One)
            modelBuilder.Entity<Author>()
                .HasOne(author => author.PreferredCategory)
                .WithMany(category => category.PreferredAuthors)
                .HasForeignKey(author => author.PreferredCategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Book - BookCategory (Many-to-Many)
            modelBuilder.Entity<BookCategory>()
                .HasKey(bc => new { bc.BookId, bc.CategoryId });

            modelBuilder.Entity<BookCategory>()
                .HasOne(bc => bc.Book)
                .WithMany(b => b.Categories)
                .HasForeignKey(bc => bc.BookId);

            modelBuilder.Entity<BookCategory>()
                .HasOne(bc => bc.Category)
                .WithMany(c => c.Books)
                .HasForeignKey(bc => bc.CategoryId);
        }
    }
}
