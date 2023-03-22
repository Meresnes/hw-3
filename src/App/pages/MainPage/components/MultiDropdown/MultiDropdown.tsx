import React, { useState } from 'react';

import styles from "./MultiDropdown.module.scss"
import OptionsIcon from "../../images/options-icon.png";
export interface Option {
  value: string;
  key: string;
}

type MultiDropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: Option) => void;
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, onChange, value }) => {

  const [selectedOptions, setSelectedOptions] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (option: Option) => {
    setSelectedOptions(option.value);
    onChange(option);
    setOpen(false)
  };

  return (

    <div className={styles.container}>
      <div className={styles.container__icon_block}>
        <img className={styles.dropdown_block__img} src={OptionsIcon} alt="author: alfanz" />
        <input type="button" className={styles.multi_main__item} value={selectedOptions} onClick={() => setOpen(!open)} />
      </div>
      <ul className={`${styles.multi_dropdown__body} ${!open ? styles.hide : ""}`}>
        {options.map((option: Option) => (

          <li className={`${styles.multi_dropdown__item} ${option.value == selectedOptions ? styles.active : ""}`} key={option.value} onClick={() => handleClick(option)}>
            {option.value}
          </li>

        ))}
      </ul>

    </div>

  );
}
export default MultiDropdown;