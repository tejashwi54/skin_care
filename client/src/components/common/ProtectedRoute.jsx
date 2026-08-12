import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until authentication check completes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-green-600">
          Loading...
        </h2>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User authenticated
  return children;
};

export default ProtectedRoute;