import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resendPasswordEmail } from "../../core/authentication";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { SuperBalls } from "@uiball/loaders";

function ForgotPasswordForm() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data, navigate) => {
    try {
      await dispatch(forgotPassword(data.email, navigate));
    } catch (error) {
      console.error(`Forgot password request failed: ${error}`);
    }
  };

  const handleResendPassword = async () => {
    try {
      const email = watch("email");
      if (!email) {
        toast.error("Please enter your email address.");
        return;
      }
      await dispatch(forgotPassword(email, navigate));
    } catch (error) {
      console.error(`Resend password request failed: ${error}`);
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
      <div className="options">
        <Link
          type="button"
          className="resend-password"
          onClick={handleResendPassword}
        >
          Resend Email
        </Link>
      </div>
      <button
        className={`auth-submit-button ${isLoading ? "loading-button" : ""}`}
        type="submit"
      >
        {isLoading ? <SuperBalls color="#000" size={60} /> : "Submit"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
