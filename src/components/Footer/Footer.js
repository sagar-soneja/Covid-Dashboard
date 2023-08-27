import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import insta from "../../assets/InstagramLogo.svg";
import fb from "../../assets/FacebookLogo.svg";
import twitter from "../../assets/TwitterLogo.svg";

const Footer = () => {
  return (
    <footer className="black">
      <div className="wrapper">
        <div className="content-container">
          <div className="links">
            <NavLink to="/" className="logo">
              Covid<span className="red">19</span>
            </NavLink>
            <div className="social-icons">
              <a href="#">
                <img src={fb} alt="" />
              </a>
              <a href="#">
                <img src={insta} alt="" />
              </a>
              <a href="#">
                <img src={twitter} alt="" />
              </a>
            </div>
            <div className="copyright">
              This website is designed by Soneja @2023
            </div>
          </div>

          <div className="links">
            <h3>Quick Links</h3>
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
          </div>

          <div className="links">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <a href="#">contact@gmail.com</a>
              </li>
              <li>
                <a href="#">+1 999 999 999</a>
              </li>
            </ul>
          </div>
          <div className="copyright mobile">
            This website is designed by Soneja @2023
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
