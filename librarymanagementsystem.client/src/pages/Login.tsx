import React from "react";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  return (
    <div className="max-w w-full bg-slate-800 p-8 space-y-4 shadow-md">
      <Logo />
      <h4 className="text-xl font-semibold">Log in to your account</h4>
      <LoginForm />
      <ToastContainer />
      <div className="text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
