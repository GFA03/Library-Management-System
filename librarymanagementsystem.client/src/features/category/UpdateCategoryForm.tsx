import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CategoryData {
  id: string; // Add the id field for updating
  name: string;
  description: string;
}

interface UpdateCategoryFormProps {
  onUpdateCategory: (categoryData: CategoryData) => void;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
  onUpdateCategory,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategoryData: CategoryData =
    location.state && (location.state as { category: CategoryData }).category;

  // const initialCategoryData: CategoryData | undefined = location.state;

  const [categoryData, setCategoryData] = useState<CategoryData>(
    initialCategoryData || {
      id: "",
      name: "",
      description: "",
    }
  );

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onUpdateCategory(categoryData); // Call the function passed from the parent component to update the Category
    navigate("/categories");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={categoryData.name}
          placeholder={initialCategoryData.name}
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
          placeholder={initialCategoryData.description}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Update Category</button>
    </form>
  );
};

export default UpdateCategoryForm;
