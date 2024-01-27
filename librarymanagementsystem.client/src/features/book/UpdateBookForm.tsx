import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BookData {
  id: string;
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

interface UpdateBookFormProps {
  onUpdateBook: (bookData: BookData) => void;
}

const UpdateBookForm: React.FC<UpdateBookFormProps> = ({ onUpdateBook }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialBookData: BookData =
    location.state && (location.state as { book: BookData }).book;

  // const initialBookData: BookData | undefined = location.state;

  const [bookData, setBookData] = useState<BookData>(
    initialBookData || {
      id: "",
      title: "",
      language: "",
      description: "",
      publicationDate: 0,
      availableCopies: 0,
      coverImage: "",
      authorId: "",
    }
  );

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onUpdateBook(bookData); // Call the function passed from the parent component to update the Book
    navigate("/books");
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
          placeholder={initialBookData.title}
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
          placeholder={initialBookData.language}
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
          placeholder={initialBookData.description}
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
          placeholder={initialBookData.publicationDate.toString()}
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
          placeholder={initialBookData.availableCopies.toString()}
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
          placeholder={initialBookData.coverImage}
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
          placeholder={initialBookData.authorId}
          required
        />
      </label>
      <br />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;
