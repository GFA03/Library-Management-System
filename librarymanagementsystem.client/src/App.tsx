import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import Authors from "./pages/Authors";
import Home from "./pages/Home";
import AddAuthorForm from "./features/author/AddAuthorForm";

interface AuthorData {
  firstName: string;
  lastName: string;
  nationality: string;
}

const App: React.FC = () => {
  const handleAddAuthor = async (authorData: AuthorData): Promise<void> => {
    try {
      const response = await fetch(
        "https://localhost:7277/api/Author/createAuthor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authorData),
        }
      );

      if (response.ok) {
        // Author added successfully - redirect to author list
        console.log("Author added successfully");
      } else {
        console.error("Error adding author: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route
            path="/authors/add"
            element={<AddAuthorForm onAddAuthor={handleAddAuthor} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
