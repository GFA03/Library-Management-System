import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateAuthorForm from "../features/author/CreateAuthorForm";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

function Authors() {
  const [authors, setAuthors] = useState<Author[]>();

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

  return (
    <>
      <div>
        <h1>Author List</h1>
        <ul>
          {authors?.map((author) => (
            <li key={author.id}>
              {author.firstName} {author.lastName} - {author.nationality}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/home">Go to Home Page</Link>
      <CreateAuthorForm />
    </>
  );
}

export default Authors;
