import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../core/authentication"; // Ensure this function is properly imported
import { SuperBalls } from "@uiball/loaders";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data, navigate));
    } catch (error) {
      console.error(`Login failed: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="auth-label" htmlFor="email">
        Email address{" "}
        {errors.email && (
          <span className="auth__form-error-message">Email is required</span>
        )}
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="login__form-email auth-input-field"
        placeholder="Email"
        {...register("email", { required: true })}
      />

      <label className="auth-label" htmlFor="password">
        Password{" "}
        {errors.password && (
          <span className="auth__form-error-message">Password is required</span>
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

      <div className="options">
        <div className="login__form-remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="login__form-remember-me-checkbox"
            {...register("rememberMe")}
          />
          <label className="remember-me auth-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <Link className="forgot-password" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
      <button
        className={`auth-submit-button ${isLoading ? "loading-button" : ""}`}
        type="submit"
      >
        {isLoading ? (
          <SuperBalls color="#000" size={60} />
        ) : (
          "Login to my account"
        )}
      </button>
      <p className="sign-up">
        Don't have an account?{" "}
        <Link className="auth__form-sign-up-button" to="/register">
          Sign up here
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
