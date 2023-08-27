import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "../../assets/MenuIcon.svg";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <nav>
        <NavLink to="/" className="logo" >
          Covid <span className="red">19</span>
        </NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/india">India</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
        </ul>

        <div onClick={() => setIsActive(true)} className="menu-icon">
          <img src={MenuIcon} alt="" />
        </div>
      </nav>
      <div className={`mobile-menu-container ${isActive ? "active" : ""} `}>
        <div onClick={() => setIsActive(false)} className="close-icon">
          <img src={MenuIcon} alt="" />
        </div>

        <ul>
          <li>
            <NavLink to="/" onClick={() => setIsActive(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/india" onClick={() => setIsActive(false)}>
              India
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" onClick={() => setIsActive(false)}>
              News
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
