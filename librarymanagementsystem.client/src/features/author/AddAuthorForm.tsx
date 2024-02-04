import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthorData {
  firstName: string;
  lastName: string;
  nationality: string;
}

interface AddAuthorFormProps {
  onAddAuthor: (authorData: AuthorData) => Promise<void>;
}

const AddAuthorForm: React.FC<AddAuthorFormProps> = ({ onAddAuthor }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      nationality: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      nationality: Yup.string().required("Nationality is required"),
    }),
    onSubmit: async (values) => {
      try {
        await onAddAuthor(values);
        navigate("/authors");
      } catch (error: unknown) {
        toast.error("Error adding author!");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 border rounded bg-slate-200">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-xs">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-xs">{formik.errors.lastName}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-gray-600">
            Nationality:
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded"
          />
          {formik.touched.nationality && formik.errors.nationality && (
            <div className="text-red-500 text-xs">
              {formik.errors.nationality}
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600">
            Add Author
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthorForm;
