import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks(props) {
  console.log(props);
  if (props.isLoggedIn === false) {
    return (
      <div className="logged-out nav-links">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>
    );
  } else {
    return (
      <div className="logged-in nav-links">
        <NavLink to="/userProfile">Profile</NavLink>
        <NavLink to="/login">Logout</NavLink>
      </div>
    );
  }
}
