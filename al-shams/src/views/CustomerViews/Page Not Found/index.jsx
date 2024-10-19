import React from "react";
import images from "../../../assets/images";
import "./not-found.scss";
import { AnimatedPage } from "../../../components";

function NotFound() {
  return (
    <AnimatedPage>
      <div className="page-not-found">
        <img
          className="page-not-found__image"
          src={images.error404}
          alt="404"
        />
      </div>
    </AnimatedPage>
  );
}

export default NotFound;
