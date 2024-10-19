import React from "react";
import "./viewOnlyTable.scss"
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const ViewOnlyTable = ({ heading, header, body, viewAction, setSortingFunc }) => {
  const navigate = useNavigate();
  return (
    // table container
    <div >
      {/* heading  */}
      {heading && <h1 className="view-only-table__heading">{heading}</h1>}
      {/* table  */}
      <div className="view-only-table">
        {/* table header */}
        <div className="view-only-table__header">
          {
            header.attributes.map(attribute => (
              <div 
                className="view-only-table__header__item" style={{flexGrow: attribute.flexGrow || 1}}
              >
                {attribute.nameToShow}
                <span className="view-only-table__header__item__arrow__container">
                  <span onClick={() => setSortingFunc("ASC", attribute.key)} className="view-only-table__header__item__arrow__container__box">
                    <img src={images.arrowUp} alt="↑" className="view-only-table__header__item__arrow__container__box__img1" />
                  </span>
                  <span onClick={() => setSortingFunc("DESC", attribute.key)} className="view-only-table__header__item__arrow__container__box">
                    <img src={images.arrowDown} alt="↓" className="view-only-table__header__item__arrow__container__box__img2" />
                  </span>
                </span>
              </div>
            ))
          }
        </div>
        {/* table body */}
        <div className="view-only-table__body">
          {
            body.map(row => (
              <div className={"view-only-table__body__row"+((viewAction && viewAction.baseUrl && viewAction.attribute) && " view-only-table__body__row__view")} onClick={() => {(viewAction && viewAction.baseUrl && viewAction.attribute) && navigate(`${viewAction.baseUrl}/${row[viewAction.attribute]||"abc"}`)}}>
                {
                  header.attributes.map(attribute => (
                    <div className="view-only-table__body__row__item" style={{flexGrow: attribute.flexGrow || 1}}>{row[attribute.key]}</div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ViewOnlyTable;
