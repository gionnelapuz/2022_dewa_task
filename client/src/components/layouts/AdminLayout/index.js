import React, { useEffect, useState } from "react";

import Navbar from "../../includes/Navbar";

import "./adminLayout.scss";

function AdminLayout(props) {
  const { children } = props
  return <div className="admin">
    <Navbar/>
    {children}
  </div>;
}

export default AdminLayout;
