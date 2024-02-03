import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";

const AppLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg font-bold">
            Library App
          </Link>
          <div className="space-x-4">
            <Link to="/authors" className="text-white hover:text-gray-300">
              Authors
            </Link>
            <Link to="/books" className="text-white hover:text-gray-300">
              Books
            </Link>
            <Link to="/categories" className="text-white hover:text-gray-300">
              Categories
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4">
        {/* Outlet for rendering nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
