import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../services/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const res: boolean = await signup(values);
      if (res) {
        alert("Sign up successful");
        navigate("/login");
      } else {
        alert("Sign up failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
          className={`mt-1 p-2 w-full border rounded-md ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          required
          className={`mt-1 p-2 w-full border rounded-md ${
            formik.touched.username && formik.errors.username
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
          className={`mt-1 p-2 w-full border rounded-md ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
