import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

function Authors() {
  const [authors, setAuthors] = useState<Author[]>();
  const navigate = useNavigate();
  const { role } = useAuth();

  const isAdmin = role === "Admin";

  useEffect(() => {
    fetchAuthors();
  }, []);

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

  const handleDeleteAuthor = async (id: string) => {
    try {
      const response = await fetch(
        `https://localhost:7277/api/Author/deleteAuthor/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Author deleted successfully, update the author list
        fetchAuthors();
      } else {
        // Handle error response
        console.error("Error deleting author:", response.statusText);
      }
    } catch (error: unknown) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  const handleEditAuthor = (author: Author) => {
    navigate("update", { state: { author } });
  };

  const renderAuthors = () => {
    return (
      <ul>
        {authors?.map((author) => (
          <li key={author.id}>
            {author.firstName} {author.lastName} - {author.nationality}
            {isAdmin && (
              <button onClick={() => handleDeleteAuthor(author.id)}>
                Delete
              </button>
            )}
            {isAdmin && (
              <button onClick={() => handleEditAuthor(author)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div>
        <h1>Author List</h1>
        {renderAuthors()}
      </div>
      <div>
        <Link to="/home">Go to Home Page</Link>
      </div>
      {isAdmin && (
        <div>
          <Link to="/authors/add">Add Author</Link>
        </div>
      )}
    </>
  );
}

export default Authors;
