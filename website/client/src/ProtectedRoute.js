import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // Make sure to import Navigate

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
