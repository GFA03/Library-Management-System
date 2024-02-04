import { toast } from "react-toastify";
import axios from "../axios";

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
    const response = await axios.post("Author/createAuthor", authorData);

    if (response.status === 201) {
      toast.success("Author added successfully");
    } else {
      toast.error("Error adding author!");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateAuthor(
  authorData: AuthorUpdateData
): Promise<void> {
  try {
    const response = await axios.put("Author/updateAuthor", authorData);

    console.log(response.status);

    if (response.status === 201) {
      toast.success("Author updated successfully");
    } else {
      toast.error("Error updating author!");
    }
  } catch (error) {
    console.error("Error updating author:", error);
  }
}
