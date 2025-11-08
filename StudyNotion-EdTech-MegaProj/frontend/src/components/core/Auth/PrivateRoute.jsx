// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.profile);

  if (user) {
    return children;
  } else {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;


// replace prevents the user from going back to the protected route with browser back button.