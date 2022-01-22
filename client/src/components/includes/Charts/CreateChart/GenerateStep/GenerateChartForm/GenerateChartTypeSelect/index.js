import React, { useEffect, useRef, useState } from "react";

import DownArrow from "@mui/icons-material/KeyboardArrowDown";

import styles from "./generateChartTypeSelect.module.scss";

function GenerateChartTypeSelect(props) {
  const { label, placeholder, options, error, handleChartTypeChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectOptions(formatSelectData(options));
  }, [options]);

  const formatSelectData = (options) =>
    options.map((data, i) => {
      return {
        ...data,
        selected: false,
      };
    });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleDropdownSelect = (selectData) => {
    const updateOptions = selectOptions.map((data, i) => {
      return {
        ...data,
        enabled: selectData.key === data.key ? true : false,
      };
    });

    handleChartTypeChange(selectData.key);

    setSelectOptions(updateOptions);
    setSelectedDisplay(selectData);
    toggleDropdown();
  };

  return (
    <div ref={ref} className={`select-custom ${styles.wrapper}`}>
      <h1>{label}</h1>

      <div className={`${styles.select__wrapper} `}>
        <button
          className={`btn ${isOpen ? styles.active : ""} ${
            error ? styles.error__container : ""
          }`}
          onClick={toggleDropdown}
        >
          {!selectedDisplay ? placeholder : selectedDisplay.name} <DownArrow />
        </button>
        {!isOpen || (
          <ul className={`list-group ${styles.dropdown}`}>
            {selectOptions.map((data, i) => (
              <li key={i} className="list-group-item">
                <button
                  className={`${!data.enabled || styles.active}`}
                  onClick={() => handleDropdownSelect(data)}
                >
                  <h1 className={styles.label}>{data.name}</h1>
                  {!data.description || (
                    <h6 className={styles.label__small}>{data.description}</h6>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GenerateChartTypeSelect;
