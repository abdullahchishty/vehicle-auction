import React from "react";
import "./bankDetails.scss"
const BankDetails = () => {
  return (
    <div className="contact-details bank-details">
      <div className="contact-details__container">
        <h2 className="contact-details__container__heading">Bank details</h2>
        <p className="contact-details__container__tagline">
          三菱UFG銀行<br></br>
          目黒支店<br></br>
          普通<br></br>
          支店番号  680<br></br>
          口座番号  3646087<br></br>
          口座名前：  株式会社  アル・シャムスコーポレーション<br></br>
        </p>
        <p className="contact-details__container__tagline">
          English:<br></br>
          Mitsubishi UFG Bank<br></br>
          Meguro Branch<br></br>
          Usually<br></br>
          Branch number 680<br></br>
          Account number 3646087<br></br>
          Account name: Co., Ltd. Al Shams Corporation<br></br>
        </p>
      </div>
    </div>
  );
};

export default BankDetails;
