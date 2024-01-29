interface ApiResponse {
  ok: boolean;
  statusText: string;
}

interface BookData {
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

interface BookUpdateData {
  id: string;
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

async function handleApiResponse(response: Response): Promise<ApiResponse> {
  if (response.ok) {
    return { ok: true, statusText: response.statusText };
  } else {
    const errorResponse = await response.text();
    console.error(`Error: ${response.status} - ${response.statusText}`);
    console.error(`Error response: ${errorResponse}`);
    return { ok: false, statusText: response.statusText };
  }
}

export async function createBook(bookData: BookData): Promise<void> {
  try {
    const response = await fetch("https://localhost:7277/api/Book/createBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    const apiResponse = await handleApiResponse(response);

    if (apiResponse.ok) {
      console.log("Book added successfully");
    } else {
      console.error("Error adding Book: ", apiResponse.statusText);
    }
  } catch (error) {
    console.error("Error adding Book:", error);
  }
}

export async function updateBook(bookData: BookUpdateData): Promise<void> {
  try {
    const response = await fetch(`https://localhost:7277/api/Book/updateBook`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    const apiResponse = await handleApiResponse(response);

    if (apiResponse.ok) {
      console.log("Book updated successfully");
    } else {
      console.error("Error updating Book: ", apiResponse.statusText);
    }
  } catch (error) {
    console.error("Error updating Book:", error);
  }
}
