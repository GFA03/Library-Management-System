import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthorData {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

interface UpdateAuthorFormProps {
  onUpdateAuthor: (authorData: AuthorData) => void;
}

const UpdateAuthorForm: React.FC<UpdateAuthorFormProps> = ({
  onUpdateAuthor,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialAuthorData: AuthorData = (
    location.state as { author: AuthorData }
  ).author || {
    id: "",
    firstName: "",
    lastName: "",
    nationality: "",
  };

  const formik = useFormik({
    initialValues: {
      firstName: initialAuthorData.firstName,
      lastName: initialAuthorData.lastName,
      nationality: initialAuthorData.nationality,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      nationality: Yup.string().required("Nationality is required"),
    }),
    onSubmit: (values) => {
      onUpdateAuthor({
        id: initialAuthorData.id,
        ...values,
      });
      navigate("/authors");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          placeholder={initialAuthorData.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.touched.firstName && formik.errors.firstName && (
        <div>{formik.errors.firstName}</div>
      )}
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          placeholder={initialAuthorData.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.touched.lastName && formik.errors.lastName && (
        <div>{formik.errors.lastName}</div>
      )}
      <br />
      <label>
        Nationality:
        <input
          type="text"
          name="nationality"
          value={formik.values.nationality}
          placeholder={initialAuthorData.nationality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.touched.nationality && formik.errors.nationality && (
        <div>{formik.errors.nationality}</div>
      )}
      <br />
      <button type="submit">Update Author</button>
    </form>
  );
};

export default UpdateAuthorForm;
