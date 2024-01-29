import React from "react";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 space-y-4 shadow-md">
        <Logo />
        <h4 className="text-xl font-semibold">Log in to your account</h4>
        <LoginForm />
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
