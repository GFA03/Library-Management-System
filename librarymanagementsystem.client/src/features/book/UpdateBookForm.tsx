import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import * as Yup from "yup";
import { useFormik } from "formik";

interface BookData {
  id: string;
  title: string;
  language: string;
  description: string;
  publicationDate: number;
  availableCopies: number;
  coverImage: string;
  authorId: string;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

interface UpdateBookFormProps {
  onUpdateBook: (bookData: BookData) => void;
}

const UpdateBookForm: React.FC<UpdateBookFormProps> = ({ onUpdateBook }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [authors, setAuthors] = React.useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("Author/getAuthorList");
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const initialBookData: BookData =
    location.state && (location.state as { book: BookData }).book;

  const formik = useFormik({
    initialValues: {
      id: initialBookData.id,
      title: "",
      language: "",
      description: "",
      publicationDate: 0,
      availableCopies: 0,
      coverImage: "",
      authorId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      language: Yup.string().required("Language is required"),
      description: Yup.string().required("Description is required"),
      publicationDate: Yup.number()
        .required("Publication date is required")
        .integer("Publication date must be an integer"),
      availableCopies: Yup.number()
        .required("Available copies is required")
        .integer("Available copies must be an integer"),
      coverImage: Yup.string().required("Cover image is required"),
      authorId: Yup.string().required("Author is required"),
    }),
    onSubmit: async (values) => {
      try {
        await onUpdateBook(values);
        navigate("/books");
      } catch (error) {
        console.error("Error adding Book:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder={initialBookData.title}
          required
        />
      </label>
      <br />
      <label>
        Language:
        <input
          type="text"
          name="language"
          value={formik.values.language}
          onChange={formik.handleChange}
          placeholder={initialBookData.language}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder={initialBookData.description}
          required
        />
      </label>
      <br />
      <label>
        Publication date:
        <input
          type="number"
          name="publicationDate"
          value={formik.values.publicationDate}
          onChange={formik.handleChange}
          placeholder={initialBookData.publicationDate.toString()}
          required
        />
      </label>
      <br />
      <label>
        Available copies:
        <input
          type="number"
          name="availableCopies"
          value={formik.values.availableCopies}
          onChange={formik.handleChange}
          placeholder={initialBookData.availableCopies.toString()}
          required
        />
      </label>
      <br />
      <label>
        Cover image:
        <input
          type="text"
          name="coverImage"
          value={formik.values.coverImage}
          onChange={formik.handleChange}
          placeholder={initialBookData.coverImage}
          required
        />
      </label>
      <br />

      <label>
        Author:
        <select
          name="authorId"
          value={formik.values.authorId}
          onChange={formik.handleChange}
          required>
          <option value="" disabled>
            Select an author
          </option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;
