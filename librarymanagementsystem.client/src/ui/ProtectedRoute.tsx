import { useAuth } from "../services/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Assuming you have useAuth hook

  // If there is NO authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // If there IS a user, render the app
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Redirect to /login if not authenticated
  navigate("/login");
  return null; // This line is needed to satisfy TypeScript
}

export default ProtectedRoute;
