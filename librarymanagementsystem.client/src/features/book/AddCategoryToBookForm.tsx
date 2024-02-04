import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../services/axios";

interface BookCategoryData {
  bookId: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface AddCategoryToBookFormProps {
  onAddCategoryToBook: (bookCategoryData: BookCategoryData) => Promise<void>;
}

const AddCategoryToBookForm: React.FC<AddCategoryToBookFormProps> = ({
  onAddCategoryToBook,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("Category/getCategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching Categorys:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the provided onAddCategoryToBook function with the selected category ID
    onAddCategoryToBook({
      bookId: location.state.book.id,
      categoryId: selectedCategoryId,
    });
  };

  useEffect(() => {
    // Set default selected category (if available) when categories change
    if (categories !== undefined && categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700">
          Select Category
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md">
          {categories !== undefined &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Category to Book
        </button>
      </div>
    </form>
  );
};

export default AddCategoryToBookForm;
