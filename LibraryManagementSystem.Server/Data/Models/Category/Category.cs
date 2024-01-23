using LibraryManagementSystem.Server.Data.Models.Base;

namespace LibraryManagementSystem.Server.Data.Models.Category
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
