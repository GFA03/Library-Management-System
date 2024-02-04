import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

interface BookData {
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

interface AddBookFormProps {
  onAddBook: (bookData: BookData) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const navigate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
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
        await onAddBook(values);
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
          required
        />
      </label>
      {formik.touched.title && formik.errors.title && (
        <div>{formik.errors.title}</div>
      )}
      <br />
      <label>
        Language:
        <input
          type="text"
          name="language"
          value={formik.values.language}
          onChange={formik.handleChange}
          required
        />
      </label>
      {formik.touched.language && formik.errors.language && (
        <div>{formik.errors.language}</div>
      )}
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          required
        />
      </label>
      {formik.touched.description && formik.errors.description && (
        <div>{formik.errors.description}</div>
      )}
      <br />
      <label>
        Publication date:
        <input
          type="number"
          name="publicationDate"
          value={formik.values.publicationDate}
          onChange={formik.handleChange}
          required
        />
      </label>
      {formik.touched.publicationDate && formik.errors.publicationDate && (
        <div>{formik.errors.publicationDate}</div>
      )}
      <br />
      <label>
        Available copies:
        <input
          type="number"
          name="availableCopies"
          value={formik.values.availableCopies}
          onChange={formik.handleChange}
          required
        />
      </label>
      {formik.touched.availableCopies && formik.errors.availableCopies && (
        <div>{formik.errors.availableCopies}</div>
      )}
      <br />
      <label>
        Cover image:
        <input
          type="text"
          name="coverImage"
          value={formik.values.coverImage}
          onChange={formik.handleChange}
          required
        />
      </label>
      {formik.touched.coverImage && formik.errors.coverImage && (
        <div>{formik.errors.coverImage}</div>
      )}
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
      {formik.touched.authorId && formik.errors.authorId && (
        <div>{formik.errors.authorId}</div>
      )}
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
