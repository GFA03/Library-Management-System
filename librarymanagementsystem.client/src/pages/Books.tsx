import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";
import axios from "../services/axios";
import { toast } from "react-toastify";

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
      const response = await axios.get("Book/GetBooksList");
      setBooks(response.data);
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
      const response = await axios.delete(`Book/deletebook/${id}`);
      if (response.status === 201) {
        toast.success("Book deleted successfully!");
        fetchBooks();
      } else {
        toast.error("Error deleting book!");
      }
    } catch (error: unknown) {
      toast.error("Error deleting book!");
    }
  };

  const handleLoanBook = async (id: string) => {
    try {
      const response = await axios.post(`UserBook/loan/${id}`);

      if (response.status === 200) {
        toast.success("Book loaned successfully!");
        fetchBooks();
      } else {
        toast.error("Error loaning book!");
      }
    } catch (error: unknown) {
      toast.error("Error loaning book!");
    }
  };

  const handleReturnBook = async () => {
    try {
      // Make a Return request to the API endpoint for returning a Book
      const response = await axios.post(`UserBook/return`);

      if (response.status === 200) {
        toast.success("Book returned successfully!");
        fetchBooks();
      } else {
        toast.error("Error returning book!");
      }
    } catch (error: unknown) {
      toast.error("Error returning book!");
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
