using LibraryManagementSystem.Server.Models.Base;

namespace LibraryManagementSystem.Server.Models.Category
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
