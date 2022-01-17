import React, { useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../../../components/includes/navbar";
import AdminLayout from "../../../components/layouts/adminLayout";

// import { useAuth } from "../context/authContext";

function PrivateRoute(props) {

  const { children } = props

  const location = useLocation();

  // const { authenticated } = useAuth();

  // useEffect(() => {
  //   console.log(authenticated);
  // }, [authenticated]);

  // if (!authenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children
}

export default PrivateRoute;
