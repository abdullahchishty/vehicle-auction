import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import NestedNav from "./NestedNav";
import images from "../../assets/images";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../core/adminAuthentication";
import "./adminSidebar.scss";

const AdminSidebar = () => {
  const [nestedNav, setNestedNav] = useState(null); // Track which nested nav to display
  const dispatch = useDispatch();

  // Load the nestedNav state from localStorage on component mount
  useEffect(() => {
    const savedNestedNav = localStorage.getItem("nestedNav");
    if (savedNestedNav) {
      setNestedNav(savedNestedNav); // Restore the nested menu state
    }
  }, []);

  // Save the nestedNav state to localStorage whenever it changes
  useEffect(() => {
    if (nestedNav) {
      localStorage.setItem("nestedNav", nestedNav);
    } else {
      localStorage.removeItem("nestedNav"); // Clear localStorage if no nestedNav
    }
  }, [nestedNav]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAdmin());
  };

  // Data for the nested menus
  const vehiclesOptions = [
    { name: "Inventory", link: "/admin-a1b2c3/vehicles/vehicle" },
    { name: "Make", link: "/admin-a1b2c3/vehicles/make" },
    { name: "Model", link: "/admin-a1b2c3/vehicles/model" },
    { name: "Category", link: "/admin-a1b2c3/vehicles/category" },
    { name: "Features", link: "/admin-a1b2c3/vehicles/feature" },
  ];

  const machineryOptions = [
    { name: "Inventory", link: "/admin-a1b2c3/machineries/machinery" },
    { name: "Make", link: "/admin-a1b2c3/machineries/make" },
    { name: "Model", link: "/admin-a1b2c3/machineries/model" },
    { name: "Category", link: "/admin-a1b2c3/machineries/category" },
    { name: "Features", link: "/admin-a1b2c3/machineries/feature" },
    { name: "Attributes", link: "/admin-a1b2c3/machineries/attributes" },
  ];

  // Show the main menu or a nested menu
  return (
    <div className={`sidebar ${!nestedNav && "can-collapse"}`}>
      <div className="sidebar__logo">
        <img
          className="sidebar__logo__img"
          src={images.transparentLogo}
          alt="Alshams Logo"
        />
      </div>

      <ul className={`sidebar__menu ${nestedNav ? "hidden" : ""}`}>
        <li className="sidebar__menu__item">
          <NavLink
            className={({ isActive }) =>
              `sidebar__menu__item__link sidebar__menu__item__overview ${
                isActive ? "active" : ""
              }`
            }
            to="/admin-a1b2c3/"
          >
            Overview
          </NavLink>
        </li>
        <li className="sidebar__menu__item">
          <Link
            className="sidebar__menu__item__link sidebar__menu__item__vehicles sidebar__menu__item__has-nested"
            onClick={() => setNestedNav("vehicles")}
          >
            Vehicles
          </Link>
        </li>
        {/* <li className="sidebar__menu__item">
          <Link
            className="sidebar__menu__item__link sidebar__menu__item__machinery sidebar__menu__item__has-nested"
            onClick={() => setNestedNav("machinery")}
          >
            Machinery
          </Link>
        </li> */}
        {/* <li className="sidebar__menu__item">
          <NavLink
            className={({ isActive }) =>
              `sidebar__menu__item__link sidebar__menu__item__customers ${
                isActive ? "active" : ""
              }`
            }
            to="/customers"
          >
            Customers
          </NavLink>
        </li> */}
        {/* <li className="sidebar__menu__item">
          <NavLink
            className={({ isActive }) =>
              `sidebar__menu__item__link sidebar__menu__item__verification ${
                isActive ? "active" : ""
              }`
            }
            to="/auction-verification"
          >
            Auction Verification
          </NavLink>
        </li> */}
        {/* <li className="sidebar__menu__item">
          <NavLink
            className={({ isActive }) =>
              `sidebar__menu__item__link sidebar__menu__item__shipments ${
                isActive ? "active" : ""
              }`
            }
            to="/shipments"
          >
            Shipments
          </NavLink>
        </li> */}
        {/* <li className="sidebar__menu__item">
          <NavLink
            className={({ isActive }) =>
              `sidebar__menu__item__link sidebar__menu__item__settings ${
                isActive ? "active" : ""
              }`
            }
            to="/settings"
          >
            Settings
          </NavLink>
        </li> */}
        <li className="sidebar__menu__item">
          <NavLink
            className="sidebar__menu__item__link sidebar__menu__item__logout"
            onClick={(e) => handleLogout(e)}
            to="/logout"
          >
            Logout
          </NavLink>
        </li>
      </ul>

      <div className={`nested-nav ${nestedNav ? "active" : ""}`}>
        {nestedNav && (
          <NestedNav
            title={nestedNav === "vehicles" ? "Vehicles" : "Machinery"}
            options={
              nestedNav === "vehicles" ? vehiclesOptions : machineryOptions
            }
            onBack={() => setNestedNav(null)} // Back button to return to main menu
          />
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
