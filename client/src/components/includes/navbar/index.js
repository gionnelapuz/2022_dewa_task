import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ProfileIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/ExitToApp";

import logo from "../../../resources/assets/logo-min.png";

import "./navbar.scss";

function Navbar() {
  const icons = [
    {
      icon: <DashboardIcon />,
      text: "Dashboard",
      link: '/'
    },
    // {
    //   icon: <ProfileIcon />,
    //   text: "Profile",
    //   link: '/dashboard/1'
    // },
    // {
    //   icon: <LogoutIcon />,
    //   text: "Logout",
    //   link: '/dashboard/2'
    // },
  ];

  return (
    <nav className="navbar">
      <img className="navbar-brand" alt="logo" src={logo} />
      <ul className="navbar-nav">
        {icons.map((data, i) => (
          <li key={i} className="nav-item">
            <Link className="nav-link" to={data.link}>
              {data.icon}
              <span className="navbar__text">{data.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
