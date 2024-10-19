import React, { useState } from "react";
import "./getInTouch.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../core/api";
import toast from "react-hot-toast";
import { SuperBalls } from "@uiball/loaders";
import Offices from "../Offices";

const GetInTouch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.message) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }  
    try {
      await axiosInstance.post("/user/contactUs", data);
      toast.success("Message sent successfully")
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="get-in-touch">
      <h2 className="get-in-touch__heading">Get in touch</h2>
      <p className="get-in-touch__tagline">
        Get in touch with us for any inquiries, feedback, or support — we're here to help!
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)} 
        className="get-in-touch__form"
      >
        <div className="get-in-touch__form__container">
          <label
            className="get-in-touch__form__container__label"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="get-in-touch__form__container__input"
            placeholder="John"
            required
            {...register("firstName")}
          />
        </div>
        <div className="get-in-touch__form__container">
          <label
            className="get-in-touch__form__container__label"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="get-in-touch__form__container__input"
            placeholder="Doe"
            required
            {...register("lastName")}
          />
        </div>
        <div className="get-in-touch__form__container">
          <label
            className="get-in-touch__form__container__label"
            htmlFor="email"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            className="get-in-touch__form__container__input"
            placeholder="johndoe@gmail.com"
            required
            {...register("email")}
          />
        </div>
        <div className="get-in-touch__form__container">
          <label
            className="get-in-touch__form__container__label"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="number"
            id="phone"
            className="get-in-touch__form__container__input"
            placeholder="+90 123 456 789"
            {...register("phone")}
          />
        </div>

        <textarea
          rows={5}
          id="message"
          className="get-in-touch__form__textarea"
          placeholder="Message"
          required
          {...register("message")}
        ></textarea>
        <button disabled={isLoading} type="submit" className="get-in-touch__form__submit dark-button">
          {isLoading ? <SuperBalls color="white" size={45} /> : "Send Message"}
        </button>
      </form>

      <Offices />
    </div>
  );
};

export default GetInTouch;
