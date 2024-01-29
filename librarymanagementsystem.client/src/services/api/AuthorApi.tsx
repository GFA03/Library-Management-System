interface AuthorData {
  firstName: string;
  lastName: string;
  nationality: string;
}

interface AuthorUpdateData {
  id: string; // Add the id field for updating
  firstName: string;
  lastName: string;
  nationality: string;
}

export async function createAuthor(authorData: AuthorData): Promise<void> {
  try {
    const response = await fetch(
      "https://localhost:7277/api/Author/createAuthor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authorData),
      }
    );

    if (response.ok) {
      // Author added successfully - redirect to author list
      console.log("Author added successfully");
    } else {
      console.error("Error adding author: ", response.statusText);
    }
  } catch (error) {
    console.error("Error adding author:", error);
  }
}

export async function updateAuthor(
  authorData: AuthorUpdateData
): Promise<void> {
  try {
    console.log(authorData);
    const response = await fetch(
      `https://localhost:7277/api/Author/updateAuthor`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authorData),
      }
    );

    if (response.ok) {
      // Author updated successfully - navigate back to the author list

      console.log("Author updated successfully");
    } else {
      console.error("Error updating author: ", response.statusText);
    }
  } catch (error) {
    console.error("Error updating author:", error);
  }
}
