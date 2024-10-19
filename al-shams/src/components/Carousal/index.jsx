import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./carousalStyle.scss";

const CarouselComponent = (props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };
  return (
    <section className="carousal__container">
      <div style={{ position: "relative" }}>
        <Carousel
          showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          infinite={true}
          responsive={responsive}
          dotListClass="custom-dot-list-style button"
        >
          {props.sliderList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CarouselComponent;
