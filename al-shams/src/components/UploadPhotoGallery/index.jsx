import React, { useEffect, useState } from "react";
import "./uploadPhotoGallery.scss";
const UploadPhotoGallery = ({
  value,
  onChange,
  imageSectionTitle,
  initialData,
}) => {
  const [initialImages, setInitialImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}/`;
  useEffect(() => {
    const formatInitialImages = (images) =>
      images
        .filter((image) => image !== "[]" && image.trim() !== "")
        .map((image, index) => ({
          id: `initial-${index}`,
          preview: baseURL + image,
          isInitial: true,
        }));
    if (initialData?.IMAGES?.length > 0) {
      setInitialImages(formatInitialImages(initialData.IMAGES));
    }
  }, [initialData, baseURL]);
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map((file) => ({
      id: `new-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      isInitial: false,
    }));
    const updatedNewImages = [...newImages, ...newPhotos];
    setNewImages(updatedNewImages);
    onChange({ newImages: updatedNewImages, initialImages });
  };
  const handleDeletePhoto = (idToRemove, isInitial) => {
    if (isInitial) {
      const updatedInitialImages = initialImages.filter(
        (img) => img.id !== idToRemove
      );
      setInitialImages(updatedInitialImages);
      onChange({ newImages, initialImages: updatedInitialImages });
    } else {
      const updatedNewImages = newImages.filter((img) => img.id !== idToRemove);
      setNewImages(updatedNewImages);
      onChange({ newImages: updatedNewImages, initialImages });
    }
  };
  const renderPhotoRows = (photos) => {
    const rows = [];
    for (let i = 0; i < photos.length; i += 100) {
      const row = photos.slice(i, i + 100);
      rows.push(
        <div key={`row-${i}`} className="upload-photo-gallery__preview-row">
          {row.map((photo) => (
            <div key={photo.id} className="upload-photo-gallery__preview-item">
              <img
                src={photo.preview}
                alt={`Uploaded preview ${photo.id}`}
                className="upload-photo-gallery__image"
              />
              <button
                className="upload-photo-gallery__delete-btn"
                onClick={() => handleDeletePhoto(photo.id, photo.isInitial)}
              ></button>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };
  return (
    <div className="upload-photo-gallery">
      <h3 className="upload-photo-gallery__title">{imageSectionTitle}</h3>
      <label
        htmlFor="photo-upload"
        className="upload-photo-gallery__upload-btn"
      >
        <i className="upload-icon"></i>
        <span className="upload-photo-gallery__heading">Upload Photos</span>
        <p className="upload-photo-gallery__minimum-photos">
          Adding at least 8 pictures improves the chances for a quick sale.
        </p>
        <input
          id="photo-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          onChange={handlePhotoUpload}
          className="upload-photo-gallery__input"
        />
      </label>
      {renderPhotoRows([...initialImages, ...newImages])}
    </div>
  );
};
export default UploadPhotoGallery;
