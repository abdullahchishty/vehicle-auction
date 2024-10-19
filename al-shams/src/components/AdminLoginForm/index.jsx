import React from "react";
import logo from "../../assets/images/logo.svg";
import "./adminLoginForm.scss";
import { useForm } from "react-hook-form";
import { SuperBalls } from "@uiball/loaders";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../core/adminAuthentication";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isLoading = useSelector((state) => state.adminAuth.isLoading);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginAdmin(data, navigate));
    } catch (error) {
      console.error(`Login failed: ${error}`);
    }
  };
  return (
    <div className="admin-login-form">
      <div className="admin-login-form__container">
        <img
          className="admin-login-form__container__logo"
          src={logo}
          alt="Al-Shams-Logo"
        />

        <h2 className="admin-login-form__container__heading">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="auth-label" htmlFor="email">
            Username{" "}
            {errors.email && (
              <span className="auth__form-error-message">
                Username is required
              </span>
            )}
          </label>
          <input
            type="name"
            id="username"
            name="username"
            className="login__form-email auth-input-field"
            placeholder="Username"
            {...register("username", { required: true })}
          />

          <label className="auth-label" htmlFor="password">
            Password{" "}
            {errors.password && (
              <span className="auth__form-error-message">
                Password is required
              </span>
            )}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login__form-password auth-input-field"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <button
            className={`auth-submit-button ${
              isLoading ? "loading-button" : ""
            }`}
            type="submit"
          >
            {isLoading ? (
              <SuperBalls color="#000" size={60} />
            ) : (
              "Login to my account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
