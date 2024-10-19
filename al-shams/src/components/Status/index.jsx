import React, { useState } from "react";

const Status = ({ status }) => {

  const markedClass = "verify-auction-sheet-modal__status__marked"
  return status ? (
    <div className="verify-auction-sheet-modal__status">
      <span className={status === "Enter Details" ? markedClass : null}>Enter Details</span>
      <div >_____________</div>
      <span className={status === "Make Payment" ? markedClass : null}>Make Payment</span>
      <div >_____________</div>
      <span className={status === "Download File" ? markedClass : null}>Download File</span>
    </div>
  ) : null;
};

export default Status;
