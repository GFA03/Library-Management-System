import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryData {
  name: string;
  description: string;
}

interface AddCategoryFormProps {
  onAddCategory: (categoryData: CategoryData) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onAddCategory }) => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState<CategoryData>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the function passed from the parent component to add the Category
    try {
      // Call the function passed from the parent component to add the Category
      await onAddCategory(categoryData);
      // If the Category was added successfully, navigate to the Categorys list
      console.log("Category added successfully");
      navigate("/categories");
    } catch (error) {
      console.error("Error adding Category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={categoryData.description}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
