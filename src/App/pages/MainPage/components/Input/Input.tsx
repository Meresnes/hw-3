import React from "react";

import cn from "classnames";

import styles from "./Input.module.scss";
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string | undefined;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};
// value, placeholder, onChange, disabled
const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  disabled,
  onChange,
  className = "",
  ...props
}) => {
  const classNames = cn(`${styles.input}`, `${className}`);
  return (
    <input
      className={classNames}
      type="text"
      value={value === (null || "null") ? "" : value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};
export default Input;
