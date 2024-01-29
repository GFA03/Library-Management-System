import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface BookData {
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

interface AddBookFormProps {
  onAddBook: (bookData: BookData) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState<BookData>({
    title: "",
    language: "",
    description: "",
    publicationDate: 0,
    availableCopies: 0,
    coverImage: "",
    authorId: "",
  });

  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    // Fetch the list of authors from the server
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://localhost:7277/api/Author/getAuthorList"
        );
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBookData({ ...bookData, authorId: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the function passed from the parent component to add the Book
    try {
      // Call the function passed from the parent component to add the Book
      await onAddBook(bookData);
      // If the Book was added successfully, navigate to the Books list
      console.log("Book added successfully");
      navigate("/books");
    } catch (error) {
      console.error("Error adding Book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Language:
        <input
          type="text"
          name="language"
          value={bookData.language}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={bookData.description}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Publication date:
        <input
          type="number"
          name="publicationDate"
          value={bookData.publicationDate}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Available copies:
        <input
          type="number"
          name="availableCopies"
          value={bookData.availableCopies}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Cover image:
        <input
          type="text"
          name="coverImage"
          value={bookData.coverImage}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      {/* aici trebuie sa faci select din toata lista de autori */}
      <label>
        Author:
        <select
          name="authorId"
          value={bookData.authorId}
          onChange={handleSelectChange}
          required>
          <option value="" disabled>
            Select an author
          </option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
