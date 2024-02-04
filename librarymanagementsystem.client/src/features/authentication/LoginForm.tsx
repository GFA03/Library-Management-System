import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../services/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const res = await login(values.email, values.password);
      if (res === true) navigate("/home");
      else alert("Login failed");
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-4 border rounded bg-slate-200">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`w-full px-3 py-2 mt-1 text-sm border rounded ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={`w-full px-3 py-2 mt-1 text-sm border rounded ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
