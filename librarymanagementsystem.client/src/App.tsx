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
import AddBookForm from "./features/book/AddBookForm";
import UpdateAuthorForm from "./features/author/UpdateAuthorForm";
import Books from "./pages/Books";
import UpdateBookForm from "./features/book/UpdateBookForm";
import Categories from "./pages/Categories";
import AddCategoryForm from "./features/category/AddCategoryForm";
import UpdateCategoryForm from "./features/category/UpdateCategoryForm";

interface AuthorData {
  firstName: string;
  lastName: string;
  nationality: string;
}

interface AuthorUpdateData {
  id: string; // Add the id field for updating
  firstName: string;
  lastName: string;
  nationality: string;
}

interface BookData {
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

interface BookUpdateData {
  id: string;
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

interface CategoryData {
  name: string;
  description: string;
}

interface CategoryUpdateData {
  id: string; // Add the id field for updating
  name: string;
  description: string;
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

  const handleUpdateAuthor = async (authorData: AuthorUpdateData) => {
    try {
      console.log(authorData);
      const response = await fetch(
        `https://localhost:7277/api/Author/updateAuthor`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authorData),
        }
      );

      if (response.ok) {
        // Author updated successfully - navigate back to the author list

        console.log("Author updated successfully");
      } else {
        console.error("Error updating author: ", response.statusText);
      }
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const handleAddBook = async (bookData: BookData): Promise<void> => {
    try {
      const response = await fetch(
        "https://localhost:7277/api/Book/createBook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        // Book added successfully - redirect to Book list
        console.log("Book added successfully");
      } else {
        console.error("Error adding Book: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding Book:", error);
    }
  };

  const handleUpdateBook = async (bookData: BookUpdateData) => {
    try {
      console.log(bookData);
      const response = await fetch(
        `https://localhost:7277/api/Book/updateBook`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        // Book updated successfully - navigate back to the Book list

        console.log("Book updated successfully");
      } else {
        console.error("Error updating Book: ", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Book:", error);
    }
  };

  const handleAddCategory = async (
    categoryData: CategoryData
  ): Promise<void> => {
    try {
      const response = await fetch(
        "https://localhost:7277/api/Category/createCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );

      if (response.ok) {
        // Category added successfully - redirect to Category list
        console.log("Category added successfully");
      } else {
        console.error("Error adding Category: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding Category:", error);
    }
  };

  const handleUpdateCategory = async (categoryData: CategoryUpdateData) => {
    try {
      console.log(categoryData);
      const response = await fetch(
        `https://localhost:7277/api/Category/updateCategory`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );

      if (response.ok) {
        // Category updated successfully - navigate back to the Category list

        console.log("Category updated successfully");
      } else {
        console.error("Error updating Category: ", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Category:", error);
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
          <Route
            path="/authors/update"
            element={<UpdateAuthorForm onUpdateAuthor={handleUpdateAuthor} />}
          />
          <Route path="/books" element={<Books />} />
          <Route
            path="/books/add"
            element={<AddBookForm onAddBook={handleAddBook} />}
          />
          <Route
            path="/books/update"
            element={<UpdateBookForm onUpdateBook={handleUpdateBook} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/add"
            element={<AddCategoryForm onAddCategory={handleAddCategory} />}
          />
          <Route
            path="/categories/update"
            element={
              <UpdateCategoryForm onUpdateCategory={handleUpdateCategory} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
