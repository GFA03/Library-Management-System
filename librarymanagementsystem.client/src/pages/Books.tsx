import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

function Books() {
  const [books, setBooks] = useState<Book[]>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://localhost:7277/api/Book/GetBooksList"
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    // Display a confirmation dialog before proceeding
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!userConfirmed) {
      return; // Do nothing if the user cancels the deletion
    }

    try {
      // Make a DELETE request to the API endpoint for deleting the Book
      const response = await fetch(
        `https://localhost:7277/api/Book/deleteBook/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Book deleted successfully, update the Book list
        fetchBooks();
      } else {
        // Handle error response
        console.error("Error deleting book:", response.statusText);
      }
    } catch (error: unknown) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Book List</h1>
        <ul>
          {books?.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <i>{book.language}</i>
              <p> {book.description}</p>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              <button onClick={() => navigate("update", { state: { book } })}>
                Edit
              </button>
              <button
                onClick={() => navigate("addCategory", { state: { book } })}>
                Add Category
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/home">Go to Home Page</Link>
      </div>
      <div>
        <Link to="/books/add">Add Book</Link>
      </div>
    </>
  );
}

export default Books;
