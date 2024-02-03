import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";

interface Category {
  id: string;
  name: string;
  description: string;
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>();

  const { role } = useAuth();

  const isAdmin = role === "Admin";

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://localhost:7277/api/Category/getCategories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching Categorys:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      // Make a DELETE request to the API endpoint for deleting the Category
      const response = await fetch(
        `https://localhost:7277/api/Category/deleteCategory/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Category deleted successfully, update the Category list
        fetchCategories();
      } else {
        // Handle error response
        console.error("Error deleting Category:", response.statusText);
      }
    } catch (error: unknown) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Category List</h1>
        <ul>
          {categories?.map((category) => (
            <li key={category.id}>
              {category.name} - {category.description}
              {isAdmin && (
                <button onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => navigate("update", { state: { category } })}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/home">Go to Home Page</Link>
      </div>
      {isAdmin && (
        <div>
          <Link to="/categories/add">Add Category</Link>
        </div>
      )}
    </>
  );
}

export default Categories;
