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
  const isNumber: boolean = typeof value === "number";
  return (
    <button
      className={isNumber ? styles.button : styles.dots_style}
      onClick={() => onClickHandler(Number(value))}
      disabled={!isNumber}
    >
      <div
        className={`${styles.button_text} ${
          activeValue === value ? styles.active : ""
        }`}
      >
        {isNumber ? JSON.stringify(value) : "..."}
      </div>
    </button>
  );
};
export default memo(PaginationButton);
