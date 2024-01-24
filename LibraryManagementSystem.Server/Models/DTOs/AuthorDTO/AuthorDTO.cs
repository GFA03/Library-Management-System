﻿namespace LibraryManagementSystem.Server.Models.DTOs.AuthorDTO
{
    public class AuthorDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Nationality { get; set; }
    }
}
