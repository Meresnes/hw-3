import React, { memo } from "react";

import styles from "./PaginationButton.module.scss";

type PaginationButtonProps = {
  value: number | string;
  onClickHandler: (value: number) => void;
  activeValue: number;
};
const PaginationButton: React.FC<PaginationButtonProps> = ({
  value,
  onClickHandler,
  activeValue,
}) => {
  return (
    <div
      className={typeof value === "number" ? styles.button : styles.dots_style}
      onClick={
        typeof value === "number" ? () => onClickHandler(value) : () => ""
      }
    >
      <div
        className={`${styles.button_text} ${
          activeValue === value ? styles.active : ""
        }`}
      >
        {typeof value === "number" ? JSON.stringify(value) : "..."}
      </div>
    </div>
  );
};
export default memo(PaginationButton);
