import React, { useState } from "react";
import "./verifyAuctionSheetModal.scss"
import Status from "../Status"
import VerificationDetails from "../VerificationDetails"

const VerifyAuctionSheetModal = ({ heading, status, description, inputFields, btnText, onSubmitFunction, closeModal, next, details }) => {

  const onSubmit = (E) => {
    onSubmitFunction && onSubmitFunction()
    next && next();
  }

  return (
    <div className="verify-auction-sheet-modal-container" onClick={closeModal}>
      <div className="verify-auction-sheet-modal" onClick={E => E.stopPropagation()}>
        {<h2 className="verify-auction-sheet-modal__heading">{heading}</h2>}
        <Status status={status} />
        <p className="verify-auction-sheet-modal__description">{description}</p>
        {inputFields &&
          inputFields.map((item, index) => {
            if (index === inputFields.length - 2) return null;
            if (index === inputFields.length - 1) return (
              <div className="verify-auction-sheet-modal__input-field-box">
                <input 
                  type={inputFields[inputFields.length - 2].type} 
                  placeholder={inputFields[inputFields.length - 2].placeholder} 
                  value={inputFields[inputFields.length - 2].value} onChange={(E) => {inputFields[inputFields.length - 2].setValue(E.target.value) }} 
                  className="verify-auction-sheet-modal__input-fields"
                  required 
                />
                <input 
                  type={item.type} 
                  placeholder={item.placeholder} 
                  value={item.value} 
                  onChange={(E) => {item.setValue(E.target.value) }} 
                  className="verify-auction-sheet-modal__input-fields"
                  required 
                />
              </div>
            )
            return <input
              type={item.type}
              placeholder={item.placeholder}
              value={item.value}
              onChange={(E) => { item.setValue(E.target.value) }}
              className="verify-auction-sheet-modal__input-fields"
              required
            />
          })
        }
        {details && <VerificationDetails image={details.image} sheetNo={details.sheetNo} carName={details.carName} />}
        <button type="submit" onClick={onSubmit}>{btnText}</button>
      </div>
    </div>
  );
};

export default VerifyAuctionSheetModal;
