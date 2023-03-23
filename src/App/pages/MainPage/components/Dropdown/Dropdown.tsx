import React, { useEffect, useRef, useState } from "react";

import styles from "./Dropdown.module.scss";
import OptionsIcon from "../../images/options-icon.png";
export interface Option {
  value: string;
  key: string;
}

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: Option) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value }) => {
  const [selectedOptions, setSelectedOptions] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);
  const dropdownBodyRef = useRef<HTMLDivElement>(null);

  const handleClick = (option: Option) => {
    setSelectedOptions(option.value);
    onChange(option);

    setOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownBodyRef.current &&
      !dropdownBodyRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.container} ref={dropdownBodyRef}>
      <div className={styles.container__icon_block}>
        <img
          className={styles.dropdown_block__img}
          src={OptionsIcon}
          alt="author: alfanz"
        />
        <input
          type="button"
          className={styles.multi_main__item}
          value={selectedOptions}
          onClick={() => setOpen(!open)}
        />
      </div>
      <ul
        className={`${styles.multi_dropdown__body} ${!open ? styles.hide : ""}`}
      >
        {options.map((option: Option) => (
          <li
            className={`${styles.multi_dropdown__item} ${
              option.value === selectedOptions ? styles.active : ""
            }`}
            key={option.value}
            onClick={() => handleClick(option)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
