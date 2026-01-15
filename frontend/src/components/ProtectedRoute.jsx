
import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";        
import { AuthContext } from "../components/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
  
    if (!isLoggedIn) {
        toast.error("You need to be logged in to access this page.");
      return <Navigate to="/" />;
    }
  
    return children;
  };
  export default ProtectedRoute;

  