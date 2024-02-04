import { toast } from "react-toastify";
import axios from "../axios";

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

interface BookCategoryData {
  bookId: string;
  categoryId: string;
}

export async function createBook(bookData: BookData): Promise<void> {
  try {
    const response = await axios.post("Book/createBook", bookData);

    if (response.status === 200) {
      toast.success("Book added successfully");
    } else {
      toast.error("Error adding book!");
    }
  } catch (error) {
    console.error("Error adding Book:", error);
  }
}

export async function updateBook(bookData: BookUpdateData): Promise<void> {
  try {
    const response = await axios.put("Book/updateBook", bookData);

    if (response.status === 201) {
      toast.success("Book updated successfully");
    } else {
      toast.error("Error updating book!");
    }
  } catch (error) {
    console.error("Error updating Book:", error);
  }
}

export async function createBookCategory(
  bookCategoryData: BookCategoryData
): Promise<void> {
  try {
    const response = await axios.post(
      "BookCategory/CreateBookCategory",
      bookCategoryData
    );

    if (response.status === 200) {
      toast.success("Book category created successfully");
    } else {
      toast.error("Error adding category to book!");
    }
  } catch (error) {
    console.error("Error adding category to book:", error);
  }
}
