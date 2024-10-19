import "./header.scss";
import logo from "../../assets/images/logo.svg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../core/authentication";
function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token.accessToken);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOnVerifyBtn = () => {
    navigate("/auction-sheet");
  }

  return (
    <header>
      <div className="container desktop-header">
        <nav>
          <div className="logo">
            <Link className="header-link" to="/">
              <img src={logo} alt="ALSHAMS Logo" />
            </Link>
          </div>
          <ul className="nav-links">
            <li className="header-li">
              <Link className="header-link" to="/">
                Home
              </Link>
            </li>
            <li className="dropdown header-li">
              <div className="header-link" to="#">
                Vehicles
              </div>
              <div className="dropdown-content">
                <Link className="header-link" to="/listings/inventory">
                  Inventory
                </Link>
                <Link className="header-link" to="/listings/auction">
                  Auction
                </Link>
              </div>
            </li>
            {/* <li className="header-li">
              <Link className="header-link" to="/listings">
                Machinery
              </Link>
            </li> */}
            <li className="header-li">
              <Link className="header-link" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="header-li">
              <Link className="header-link" to="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          {/* <button onClick={handleClickOnVerifyBtn} className="verify-btn">Verify Auction Sheet</button> */}
          <div className="contact-info">
            <Link
              className="whatsapp-number header-link"
              to={"https://wa.me/+818020554445"}
            >
              <span>+81 80-2055-4445</span>
            </Link>
          </div>
          <div className="sign-in nav-links">
            {token ? (
              <li className="dropdown header-li ">
                <Link className=" logged-in-icon" to="#"></Link>
                <div className="dropdown-content">
                  {/* <Link className="header-link no-icon" to="/listings">
                    My Shippments
                  </Link> */}
                  <Link
                    className="header-link no-icon"
                    onClick={() => logout()}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            ) : (
              <Link className="header-link" to="/login">
                <span>Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <div className="container">
          <div className="logo">
            <Link className="header-link" to="/">
              <img src={logo} alt="ALSHAMS Logo" />
            </Link>
          </div>
          <button className="hamburger-menu" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li className="header-li">
              <Link className="header-link" to="/">
                Home
              </Link>
            </li>
            <li
              className="dropdown header-li"
              onClick={() => toggleDropdown(0)}
            >
              <Link className="header-link" to="#">
                Vehicles
              </Link>
              <div
                onClick={(e) => e.preventDefault()}
                className={`dropdown-content ${
                  openDropdown === 0 ? "dropdown-open" : ""
                }`}
              >
                <Link className="header-link" to="/listings">
                  Inventory
                </Link>
                <Link className="header-link" to="/listings">
                  Auction
                </Link>
              </div>
            </li>
            {/* <li className="header-li">
              <Link className="header-link" to="/listings">
                Machinery
              </Link>
            </li> */}
            <li className="header-li">
              <Link className="header-link" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="header-li">
              <Link className="header-link" to="/contact-us">
                Contact Us
              </Link>
            </li>
            {token ? (
              <li
                className="dropdown header-li"
                onClick={() => toggleDropdown(3)}
              >
                <Link className="header-link" to="#">
                  Profile
                </Link>
                <div
                  onClick={(e) => e.preventDefault()}
                  className={`dropdown-content ${
                    openDropdown === 3 ? "dropdown-open" : ""
                  }`}
                >
                  {/* <Link className="header-link" to="/listings">
                    My Shippments
                  </Link> */}
                  <Link className="header-link" onClick={() => logout()}>
                    Logout
                  </Link>
                </div>
              </li>
            ) : (
              <li className="header-li">
                <Link className="header-link" to="/login">
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {/* <div className="contact-info">
            <button className="verify-btn" onClick={handleClickOnVerifyBtn}>Verify Auction Sheet</button>
          </div> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
