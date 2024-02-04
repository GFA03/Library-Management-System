import React, { ReactNode } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

const AppLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg font-bold">
            Library App
          </Link>
          <div className="space-x-4">
            <NavLink to="/authors">Authors</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto bg-gray-600 p-4">
        {/* Outlet for rendering nested routes */}
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
};

// Custom NavLink component for better styling
const NavLink: React.FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => (
  <Link
    to={to}
    className="text-white hover:text-gray-300 transition duration-300">
    {children}
  </Link>
);

export default AppLayout;
