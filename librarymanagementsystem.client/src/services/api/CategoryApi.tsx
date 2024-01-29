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
}

export async function updateCategory(
  categoryData: CategoryUpdateData
): Promise<void> {
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
}
