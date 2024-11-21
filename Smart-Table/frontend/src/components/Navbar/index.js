import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const openCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">Mechlodin</h1>
      </div>
      <div className="navbar-icons">
        <button type="button" className="nav-icon-button" onClick={openCart}>
          <IoMdCart className="nav-icon" />
        </button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
          className="profile-img"
          alt="profile"
        />
      </div>
    </nav>
  );
};

export default Navbar;
