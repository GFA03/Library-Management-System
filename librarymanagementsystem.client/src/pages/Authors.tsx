import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";
import axios from "../services/axios";
import { toast } from "react-toastify";

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
      const response = await axios.get("Author/getAuthorList");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleDeleteAuthor = async (id: string) => {
    try {
      const response = await axios.delete(`Author/deleteAuthor/${id}`);
      if (response.status === 201) {
        toast.success("Author deleted successfully!");
        fetchAuthors();
      } else {
        toast.error("Error deleting author!");
      }
    } catch (error: unknown) {
      toast.error("Error deleting author!");
    }
  };

  const handleEditAuthor = (author: Author) => {
    navigate("update", { state: { author } });
  };

  const renderAuthors = () => {
    return (
      <ul className="list-disc pl-4">
        {authors?.map((author) => (
          <li key={author.id} className="mb-2">
            <span className="font-semibold">
              {author.firstName} {author.lastName} - {author.nationality}
            </span>
            {isAdmin && (
              <button
                onClick={() => handleDeleteAuthor(author.id)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => handleEditAuthor(author)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Author List</h1>
      {renderAuthors()}
      <div className="mt-4">
        <Link to="/home" className="text-blue-500 hover:underline">
          Go to Home Page
        </Link>
      </div>
      {isAdmin && (
        <div className="mt-4">
          <Link to="/authors/add" className="text-green-500 hover:underline">
            Add Author
          </Link>
        </div>
      )}
    </div>
  );
}

export default Authors;
