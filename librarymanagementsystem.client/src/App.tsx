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

import { createAuthor, updateAuthor } from "./services/apis/AuthorApi";
import {
  createBook,
  updateBook,
  createBookCategory,
} from "./services/apis/BookApi";
import { createCategory, updateCategory } from "./services/apis/CategoryApi";
import { AuthProvider } from "./services/contexts/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import SignUpForm from "./features/authentication/SignUpForm";
import AddCategoryToBookForm from "./features/book/AddCategoryToBookForm";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
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
              path="/books/addCategory"
              element={
                <AddCategoryToBookForm
                  onAddCategoryToBook={createBookCategory}
                />
              }
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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
