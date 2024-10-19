import React, { useState, useRef, useEffect } from "react";
import "./dynamicModal.scss";
import AnimatedPage from "../AnimatedPage";

const DynamicModal = ({ title, fields, initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [imageFile, setImageFile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (imageFile) {
      formDataToSend.append("image", imageFile); // Add the image file to the FormData
    }

    try {
      await onSubmit(formDataToSend); // Calls the API to add/edit
      onClose(); // Close modal after submitting
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h2 className="modal-content__heading">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="modal-content__field" key={field.name}>
              {field.type === "select" ? (
                <label className="modal-content__label">
                  {field.label}:
                  <select
                    className="modal-content__label__select"
                    name={field.name}
                    required={field.required}
                    value={formData[field.name] || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="" hidden>
                      {formData[field.name]
                        ? formData[field.name]
                        : `Select an option`}
                    </option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : field.type === "file" ? ( // Check if the field type is 'file'
                <label className="modal-content__label">
                  {field.label}:
                  <input
                    className="modal-content__label__input"
                    type="file"
                    name={field.name}
                    accept={field.accept} // Add accept attribute for file type restrictions
                    onChange={handleFileChange} // Handle file changes
                    placeholder={field.placeholder || ""}
                  />
                </label>
              ) : (
                <label className="modal-content__label" key={field.name}>
                  {field.label}:
                  <input
                    className="modal-content__label__input"
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || ""}
                    required
                  />
                </label>
              )}
            </div>
          ))}
          <button className="dark-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DynamicModal;
