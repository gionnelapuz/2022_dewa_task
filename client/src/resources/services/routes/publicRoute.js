import React, { useContext } from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

function PublicRoute({ children }) {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PublicRoute;
