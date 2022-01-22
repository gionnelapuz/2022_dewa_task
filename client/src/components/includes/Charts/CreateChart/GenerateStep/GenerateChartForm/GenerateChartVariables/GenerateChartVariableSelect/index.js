import React, { useEffect, useRef, useState } from "react";

import DownArrow from "@mui/icons-material/KeyboardArrowDown";

import styles from "./generateChartVariablesSelect.module.scss";

function ChartOptionVariablesSelect(props) {
  const {
    label,
    placeholder,
    options,
    selectedHeaders,
    handleSelectedHeaders,
    handleChartAction,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);

  const [lastActiveData, setLastActiveData] = useState(null);

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
    if (options) {
      setSelectOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (Object.keys(selectedHeaders).length === 0) {
      setSelectedDisplay(null);
      setLastActiveData(null);
    }
  }, [selectedHeaders]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleDropdownSelect = (selectedData) => {
    let action = "";
    let updatedSelectedHeaders = { ...selectedHeaders };

    if (selectedData in updatedSelectedHeaders) {
      delete updatedSelectedHeaders[selectedData];
      setLastActiveData(null);
      setSelectedDisplay(null);

      action = "remove";
    }
    if (lastActiveData !== selectedData) {
      delete updatedSelectedHeaders[lastActiveData];
      setLastActiveData(selectedData);
      updatedSelectedHeaders[selectedData] = selectOptions.key;
      setSelectedDisplay(selectedData);

      action = "change";
    }

    handleSelectedHeaders(updatedSelectedHeaders);
    handleChartAction(action, selectOptions.key, selectedData);
    toggleDropdown();
  };

  return (
    <div ref={ref} className={`${styles.wrapper}`}>
      <label>{label}</label>
      <div className={styles.select}>
        <button
          className={`btn ${isOpen ? styles.active : ""}`}
          onClick={toggleDropdown}
        >
          {!selectedDisplay ? placeholder : selectedDisplay} <DownArrow />
        </button>
        {!isOpen || (
          <ul className={`list-group ${styles.dropdown}`}>
            {selectOptions.headers.map((data, i) => (
              <li key={i} className="list-group-item">
                <button
                  className={`${
                    selectedHeaders[data] === selectOptions.key
                      ? styles.active
                      : null
                  }`}
                  disabled={
                    data in selectedHeaders &&
                    selectedHeaders[data] !== selectOptions.key
                  }
                  onClick={() => handleDropdownSelect(data)}
                >
                  <span>{data}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChartOptionVariablesSelect;
