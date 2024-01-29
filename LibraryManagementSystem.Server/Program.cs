using LibraryManagementSystem.Server.Data;
using LibraryManagementSystem.Server.Helpers.Extensions;
using LibraryManagementSystem.Server.Helpers.Seeders;
using LibraryManagementSystem.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials();
    });
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<LibraryDatabaseContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddRoles<IdentityRole<Guid>>()
    .AddEntityFrameworkStores<LibraryDatabaseContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(opt =>
{
    opt.Password.RequireDigit = true;
    opt.Password.RequiredLength = 8;
    opt.User.RequireUniqueEmail = true;
    opt.SignIn.RequireConfirmedAccount = false;
    opt.SignIn.RequireConfirmedEmail = false;
    opt.SignIn.RequireConfirmedPhoneNumber = false;
    opt.Lockout.AllowedForNewUsers = false;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddRepositories();
builder.Services.AddServices();
builder.Services.AddSeeders();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();
SeedData(app);

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using (var scope = scopedFactory.CreateScope())
    {
        var categoryService = scope.ServiceProvider.GetService<CategorySeeder>();
        categoryService.SeedInitialCategories();

        var roleService = scope.ServiceProvider.GetService<RoleSeeder>();
        roleService.SeedInitialRoles();

        var userService = scope.ServiceProvider.GetService<UserSeeder>();
        userService.SeedInitialUsers();

        var userRoleService = scope.ServiceProvider.GetService<UserRoleSeeder>();
        userRoleService.SeedInitialUsersRoles();

        var authorService = scope.ServiceProvider.GetService<AuthorSeeder>();
        authorService.SeedInitialAuthors();

        var bookService = scope.ServiceProvider.GetService<BookSeeder>();
        bookService.SeedInitialBooks();

        var bookCategoryService = scope.ServiceProvider.GetService<BookCategorySeeder>();
        bookCategoryService.SeedInitialBookCategories();
    }
}