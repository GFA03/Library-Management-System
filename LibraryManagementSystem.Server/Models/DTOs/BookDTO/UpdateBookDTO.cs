﻿namespace LibraryManagementSystem.Server.Models.DTOs.BookDTO
{
    public class UpdateBookDTO
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Language { get; set; }
        public string? Description { get; set; }
        public int PublicationDate { get; set; }
        public int AvailableCopies { get; set; }
        public string? CoverImage { get; set; }
        public Guid AuthorId { get; set; }
    }
}
