import React from "react";
import { useAuth } from "../../services/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };
    const res = await login(formData.email, formData.password);
    if (res === true) navigate("/home");
    else alert("Login failed");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded bg-white">
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
          className="w-full px-3 py-2 mt-1 text-sm border rounded"
          required
        />
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
          className="w-full px-3 py-2 mt-1 text-sm border rounded"
          required
        />
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
