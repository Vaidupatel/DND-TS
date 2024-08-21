import React, { useState } from "react";
import logo from "../../asset/NexGenSites_Technology.png";
import { Link, NavLink } from "react-router-dom";
import { useApp } from "../../Contexts/Context";
import "./LandingNavbar.css";

const Navbar = () => {
  const { user } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <React.Fragment>
      <nav className="Navbar">
        <ul className="NavbarLeftSide">
          <Link className="NavbarLogo" to="/">
            <img src={logo} alt="NexGen Sites Logo" className="Navbar-NexgenLogo" />
          </Link>
        </ul>
        <div className="NavbarHamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`NavbarRightSide ${isMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink className="NavbarPath" to="/documentation" onClick={toggleMenu}>
              Documentation
            </NavLink>
          </li>
          <li>
            <NavLink className="NavbarPath" to="/about" onClick={toggleMenu}>
              About
            </NavLink>
          </li>
          {!user ? (
            <>
              <li>
                <NavLink className="NavbarPath" to="/signup" onClick={toggleMenu}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink className="NavbarPath" to="/signin" onClick={toggleMenu}>
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="NavbarPath" to="/editor" onClick={toggleMenu}>
                  Editor
                </NavLink>
              </li>
              <li>
                <NavLink className="NavbarPath" to="/profile" onClick={toggleMenu}>
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;