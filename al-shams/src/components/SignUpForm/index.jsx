import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../core/authentication";
import { SuperBalls } from "@uiball/loaders";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser(data, navigate));
    } catch (error) {
      console.error(`Signup failed: ${error}`);
    }
  };

  const password = watch("password"); // Get the value of the password field

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="auth-label" htmlFor="name">
        Full Name{" "}
        {errors.name && (
          <span className="auth__form-error-message">Name is required</span>
        )}
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="login__form-email auth-input-field"
        placeholder="John Doe"
        {...register("name", { required: true })}
      />
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
        Create New Password{" "}
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
      <label className="auth-label" htmlFor="confirm-password">
        Confirm Password{" "}
        {errors.confirmPassword && (
          <span className="auth__form-error-message">
            Password does not match
          </span>
        )}
      </label>
      <input
        type="password"
        id="confirm-password"
        name="confirmPassword"
        className="login__form-password auth-input-field"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: true,
          validate: (value) => value === password || "Passwords do not match",
        })}
      />

      <button
        className={`auth-submit-button ${isLoading ? "loading-button" : ""}`}
        type="submit"
      >
        {isLoading ? <SuperBalls color="#000" size={60} /> : "Create account"}
      </button>
      <p className="sign-up">
        Already have an account?{" "}
        <Link className="auth__form-sign-up-button" to="/login">
          Login now
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
