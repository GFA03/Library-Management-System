import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";

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
  const { role } = useAuth();

  const isAdmin = role === "Admin";

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

  const handleLoanBook = async (id: string) => {
    try {
      // Make a Loan request to the API endpoint for loaning a Book
      const response = await fetch(
        `https://localhost:7277/api/UserBook/loan/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "text/plain",
          },
          credentials: "include",
          mode: "cors",
        }
      );

      if (response.ok) {
        // Book deleted successfully, update the Book list
        fetchBooks();
      } else {
        // Handle error response
        console.error("Error loaning book:", response.statusText);
      }
    } catch (error: unknown) {
      // Handle network or other errors
      console.error("Error loaning book:", error);
    }
  };

  const handleReturnBook = async () => {
    try {
      // Make a Loan request to the API endpoint for loaning a Book
      const response = await fetch(
        `https://localhost:7277/api/UserBook/return`,
        {
          method: "POST",
          headers: {
            Accept: "text/plain",
          },
          credentials: "include",
          mode: "cors",
        }
      );

      if (response.ok) {
        // Book deleted successfully, update the Book list
        fetchBooks();
      } else {
        // Handle error response
        console.error("Error returning book:", response.statusText);
      }
    } catch (error: unknown) {
      // Handle network or other errors
      console.error("Error returning book:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Book List</h1>
        <ul>
          {books?.map((book) => (
            <li className="bg-slate-900 p-4 m-4" key={book.id}>
              <p className="text-3xl font-bold">{book.title}</p>
              <i>{book.language}</i>
              <p className="text-sm font-thin"> {book.description}</p>
              <p>Available copies: {book.availableCopies}</p>
              {isAdmin && (
                <button
                  className="p-2 m-2"
                  onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              )}

              {isAdmin && (
                <button
                  className="p-2 m-2"
                  onClick={() => navigate("update", { state: { book } })}>
                  Edit
                </button>
              )}

              {isAdmin && (
                <button
                  className="p-2 m-2"
                  onClick={() => navigate("addCategory", { state: { book } })}>
                  Add Category
                </button>
              )}
              <button
                className="p-2 m-2"
                onClick={() => handleLoanBook(book.id)}>
                Loan
              </button>
              <button className="p-2 m-2" onClick={() => handleReturnBook()}>
                Return
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/home">Go to Home Page</Link>
      </div>
      {isAdmin && (
        <div>
          <Link to="/books/add">Add Book</Link>
        </div>
      )}
    </>
  );
}

export default Books;
