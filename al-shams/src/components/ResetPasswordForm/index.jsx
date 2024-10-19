import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { forgotPasswordReset } from "../../core/authentication";
import { SuperBalls } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract hash from URL query params
  const query = new URLSearchParams(location.search);
  const hash = query.get("id");

  const onSubmit = async (data, navigate) => {
    try {
      await dispatch(forgotPasswordReset({ ...data, hash }));
    } catch (error) {
      console.error(`Password reset failed: ${error}`);
    }
  };

  const validatePassword = (value) => {
    const password = watch("password"); // Get the value of the password field
    return value === password || "Passwords do not match";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="auth-label" htmlFor="password">
        Create New Password{" "}
        {errors.password && (
          <span className="auth__form-error-message ">
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
      <label className="auth-label" htmlFor="confirm-password">
        Confirm Password{" "}
        {errors["confirm-password"] && (
          <span className="auth__form-error-message ">
            {errors["confirm-password"].message}
          </span>
        )}
      </label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        className="login__form-password auth-input-field"
        placeholder="Confirm Password"
        {...register("confirm-password", {
          required: true,
          validate: validatePassword, // Add the custom validation function
        })}
      />

      <button
        className={`auth-submit-button ${isLoading ? "loading-button" : ""}`}
        type="submit"
      >
        {isLoading ? <SuperBalls color="#000" size={60} /> : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;
