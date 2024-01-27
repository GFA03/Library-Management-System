import React, { useState, ChangeEvent, FormEvent } from "react";
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
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
        <input
          type="text"
          name="authorId"
          value={bookData.authorId}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
