import React, { useEffect, useState } from "react";
import "./imageGallery.scss";
import IMAGES from "../../assets/images";

const ImageGallery = ({ images, listingsType }) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])
  
  return (
    <div className="image-gallery">
      <div className={"image-gallery__main-section"+(images.length ? "" : " no-image-container")}>
        <img
          className="image-gallery__main-section__image"
          src={listingsType !== "auction" ? `${import.meta.env.VITE_API_BASE_URL}/${selectedImage}` : selectedImage}
        />
        <span className="image-gallery__main-section__badge">Featured</span>
      </div>
      <div className="image-gallery__thumbnail-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={listingsType !== "auction" ? `${import.meta.env.VITE_API_BASE_URL}/${img}` : img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleImageClick(img)}
            className={`image-gallery__thumbnail-container__thumbnail ${
              selectedImage === img ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
