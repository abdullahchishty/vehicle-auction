import React, { useState } from "react";
import DeleteConfirmation from "../DeleteConfirmation";
import DynamicModal from "../DynamicModal";
import Dropdown from "../Dropdown";
import "./dynamicTable.scss";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DynamicTable = ({
  heading,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  modalFields,
  showImage,
  entity,
  actions,
  maxItems,
  manageLink,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [modalType, setModalType] = useState("add");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  // Limit the data based on maxItems prop
  const displayData = maxItems ? data.slice(0, maxItems) : data;

  const handleAddClick = () => {
    setModalType("add");
    setCurrentRow(null);

    if (!modalFields) {
      navigate(`/${entity}/add-new`);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleEditClick = (row) => {
    setModalType("edit");
    setCurrentRow(row);

    if (!modalFields) {
      navigate(`/${entity}/${row.id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (row) => {
    setCurrentRow(row);
    setIsDeleteConfirmationOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (modalType === "add") {
      onAdd(formData);
    } else {
      onEdit(formData);
    }
  };

  const toggleDropdown = (rowIndex) => {
    setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex);
  };

  return (
    <div className="table-container">
      <div className="table-container__header">
        <h2 className="table-container-header__heading">{heading}</h2>
        {maxItems && data.length > maxItems && manageLink ? (
          <button
            className="table-container__header__button"
            onClick={() => navigate(manageLink)}
          >
            Manage All
          </button>
        ) : (
          onAdd && (
            <button
              className="table-container__header__button"
              onClick={handleAddClick}
            >
              Add New
            </button>
          )
        )}
      </div>

      <table className="table-container__table">
        <thead>
          <tr className="table-container__dynamic__header">
            {columns.map((col, index) => (
              <th
                key={index}
                className="table-container__dynamic__header__cell"
                style={{ flexGrow: col.flexGrow || 1 }}
              >
                {col.header}
              </th>
            ))}
            {showImage && (
              <th
                className="table-container__dynamic__header__cell"
                style={{ flexGrow: 1 }}
              >
                Image
              </th>
            )}
            {actions && (
              <th
                className="table-container__dynamic__header__cell"
                style={{ flexGrow: 1 }}
              >
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody className="table-container__body">
          {displayData.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-container__body__row">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="table-container__body__cell"
                  style={{ flexGrow: col.flexGrow || 1 }}
                >
                  {col.field === "status" ? (
                    <span
                      className={`status ${
                        row[col.field] === "active"
                          ? "table-container__body__row__status__active"
                          : "table-container__body__row__status__inactive"
                      }`}
                    >
                      {row[col.field]}
                    </span>
                  ) : (
                    row[col.field]
                  )}
                </td>
              ))}

              {showImage && (
                <td
                  className="table-container__body__cell"
                  style={{ flexGrow: 1 }}
                >
                  {row.image ? (
                    <img
                      src={`${API_BASE_URL}/${row.image}`}
                      alt={row.name}
                      className="table-container__body__cell__image"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              )}
              {actions && (
                <td
                  className="table-container__body__cell"
                  style={{ flexGrow: 1 }}
                >
                  <div
                    className="three-dots-menu"
                    onClick={() => toggleDropdown(rowIndex)}
                  >
                    <span className="three-dots">•••</span>
                    <Dropdown
                      isOpen={activeDropdown === rowIndex}
                      toggleDropdown={() => toggleDropdown(rowIndex)}
                    >
                      <button
                        className="dropdown-container__button"
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </button>
                      {onDelete && (
                        <button
                          className="dropdown-container__button"
                          onClick={() => handleDeleteClick(row)}
                        >
                          Delete
                        </button>
                      )}
                    </Dropdown>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <DynamicModal
          title={modalType === "add" ? "Add New" : "Edit Entry"}
          fields={modalFields}
          initialData={currentRow}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}

      {isDeleteConfirmationOpen && (
        <DeleteConfirmation
          data={currentRow}
          onClose={() => setIsDeleteConfirmationOpen(false)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default DynamicTable;
