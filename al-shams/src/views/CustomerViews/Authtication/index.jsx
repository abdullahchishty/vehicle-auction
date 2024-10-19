import React, { useEffect, useRef, useState } from "react";
import "./auth.scss";
import logo from "../../../assets/images/logo.svg";
import "./authForm.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Strings } from "../../../assets/constants/strings";
import { Link } from "react-router-dom";
import usePreviousPath from "../../../hooks/usePreviousPath";
import { AnimatedPage } from "../../../components";

const Authtication = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // const history = useRef([]);

  // const previousPath = usePreviousPath();

  const handleBackClick = () => {
    // window.history.back()

    // // If there is a previous path and it's not the current path
    // if (previousPath && previousPath !== window.location.pathname) {
    //   navigate(-1);
    // } else {
    //   navigate("/");
    // }

    // history.current.pop()
    // const url = history.current.pop()
    // console.log(url)
    // url ? navigate(url) : navigate("/home");
  };

  // useEffect(() => {
  //   console.log(location.pathname)
  //   history.current.push(location.pathname)
  //   console.log(history)
  // }, [location.pathname])

  return (
    <AnimatedPage>
      <div className="auth__container">
        <div className="auth__container-wrapper">
          <div className="left-section">
            <div className="left-section-wrapper"></div>
            <div className="left-section-wrapper">
              <h1 className="auth-heading">{Strings["auth.heading"]}</h1>
              <p className="auth-subheading">{Strings["auth.subheading"]}</p>
            </div>
            <div className="left-section-wrapper">
              <p className="powered-by">{Strings["auth.poweredBy"]} <a target="blank" className="powered-by-link" href="https://computingfuturetech.com/">CFT</a></p>
            </div>
          </div>
          <div className="right-section">
            <div className="auth__navigation-wrapper">
              <Link to={"/"} onClick={handleBackClick} className="back-button">
                Home
              </Link>
              <div className="logo">
                <img src={logo} alt="Alshams Logo" />
              </div>
              <div className="spacer"></div>
            </div>
            <div className="auth__form-container">
              <h2 className="auth__form-heading">{props.heading}</h2>
              <p className="auth__form-subheading">{props.subheading}</p>
              <div className="auth__form-horizontal-divider"></div>
              {props.form}
            </div>
            <div className="auth__footer"></div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Authtication;
