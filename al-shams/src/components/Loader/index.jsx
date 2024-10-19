import React from "react";
import Styles from "./loader.module.scss";

function Loader() {
  return (
    <div className={Styles.shadow}>
      <div className={Styles.loader}>
        <div className={`${Styles.item} ${Styles.top}`}></div>
        <div className={`${Styles.item} ${Styles.left}`}></div>
        <div className={`${Styles.item} ${Styles.right}`}></div>
        <div className={`${Styles.item} ${Styles.bottom}`}></div>
      </div>
    </div>
  );
}

export default Loader;
