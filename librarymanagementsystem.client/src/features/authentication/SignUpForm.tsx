import React, { useState } from "react";
import { useAuth } from "../../services/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: boolean = await signup({ email, username, password });
    if (res) {
      alert("Sign up successful");
      navigate("/login");
    } else {
      alert("Sign up failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
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
