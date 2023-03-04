import React, { memo } from "react";

import styles from "./PaginationButton.module.scss";
type PaginationButtonProps = {
  value: number;
  onClickHandler: (value: number) => void;
  activeValue: number;
};
const PaginationButton: React.FC<PaginationButtonProps> = ({
  value,
  onClickHandler,
  activeValue,
}) => {
  return (
    <div className={styles.button} onClick={() => onClickHandler(value)}>
      <div
        className={`${styles.button_text} ${
          activeValue === value ? styles.active : ""
        }`}
      >
        {JSON.stringify(value)}
      </div>
    </div>
  );
};
export default memo(PaginationButton);
