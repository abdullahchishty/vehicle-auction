import React, { useRef, useEffect } from "react";
import "./deleteConfirmation.scss";
import AnimatedPage from "../AnimatedPage";

const DeleteConfirmation = ({ data, onClose, onDelete }) => {
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

  const handleDelete = () => {
    onDelete(data);
    onClose();
  };

  return (
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <h2 className="modal-content__heading">Confirm Deletion</h2>
          <p>
            This action cannot be undone and will permanently delete all data
            associated with this item.
          </p>
          <div className="modal-content__buttons">
            <button
              className="modal-content__buttons__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="modal-content__buttons__cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};

export default DeleteConfirmation;
