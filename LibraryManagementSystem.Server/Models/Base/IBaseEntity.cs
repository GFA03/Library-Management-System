﻿namespace LibraryManagementSystem.Server.Models.Base
{
    public interface IBaseEntity
    {
        Guid Id { get; set; }
        DateTime? CreatedDate { get; set; }
        DateTime? LastModified { get; set; }
    }
}
