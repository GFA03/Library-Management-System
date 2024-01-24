﻿namespace LibraryManagementSystem.Server.Models.DTOs.BookDTO
{
    public class CreateBookDTO
    {
        public string Title { get; set; }
        public string? Language { get; set; }
        public string? Description { get; set; }
        public string? Condition {  get; set; }
        public int PublicationDate { get; set; }
        public int AvailableCopies { get; set; }

        public Guid AuthorId { get; set; }
    }
}
