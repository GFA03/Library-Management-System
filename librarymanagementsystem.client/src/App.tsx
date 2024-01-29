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

import { createAuthor, updateAuthor } from "./services/api/AuthorApi";
import { createBook, updateBook } from "./services/api/BookApi";
import { createCategory, updateCategory } from "./services/api/CategoryApi";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route
            path="/authors/add"
            element={<AddAuthorForm onAddAuthor={createAuthor} />}
          />
          <Route
            path="/authors/update"
            element={<UpdateAuthorForm onUpdateAuthor={updateAuthor} />}
          />
          <Route path="/books" element={<Books />} />
          <Route
            path="/books/add"
            element={<AddBookForm onAddBook={createBook} />}
          />
          <Route
            path="/books/update"
            element={<UpdateBookForm onUpdateBook={updateBook} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/add"
            element={<AddCategoryForm onAddCategory={createCategory} />}
          />
          <Route
            path="/categories/update"
            element={<UpdateCategoryForm onUpdateCategory={updateCategory} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
