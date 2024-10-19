import React from "react";
import "./adminTopbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../core/adminAuthentication";

const Topbar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.adminAuth.user.username);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAdmin());
  };

  return (
    <div className="topbar">
      <div className="topbar__welcome">
        <p>{`Welcome, ${username ? username : "Admin"}`}</p>
      </div>
      <div className="topbar__actions">
        <Link to="#" className="topbar__actions__settings">
          <div className="topbar__actions__settings__dropdown">
            <Link
              className="topbar__actions__settings__dropdown__link"
              to="/settings"
            >
              Settings
            </Link>
            <Link
              className="topbar__actions__settings__dropdown__link"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="topbar__actions__settings__dropdown__link"
              onClick={(e) => handleLogout(e)}
              to="/logout"
            >
              Logout
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
