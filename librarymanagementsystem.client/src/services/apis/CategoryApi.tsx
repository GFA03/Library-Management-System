import { toast } from "react-toastify";
import axios from "../axios";

interface CategoryData {
  name: string;
  description: string;
}

interface CategoryUpdateData {
  id: string; // Add the id field for updating
  name: string;
  description: string;
}

// CategoryApi.ts
export async function createCategory(
  categoryData: CategoryData
): Promise<void> {
  try {
    const response = await axios.post("Category/createCategory", categoryData);

    console.log(response.status);
    if (response.status === 201) {
      toast.success("Category added successfully");
    } else {
      toast.error("Error adding Category!");
    }
  } catch (error) {
    console.error("Error adding Category:", error);
  }
}

export async function updateCategory(
  categoryData: CategoryUpdateData
): Promise<void> {
  try {
    const response = await axios.put("Category/updateCategory", categoryData);

    if (response.status === 201) {
      toast.success("Category updated successfully");
    } else {
      toast.error("Error updating Category!");
    }
  } catch (error) {
    console.error("Error updating Category:", error);
  }
}
