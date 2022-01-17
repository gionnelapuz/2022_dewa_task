import React, { useEffect, useRef, useState } from "react";
import { useDatasets } from "../../../../../../resources/services/contexts/createGraphProvider/datasetProvider";
import { useGraphRender } from "../../../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";

import DownArrow from "@mui/icons-material/KeyboardArrowDown";

import styles from "./chartTypeSelect.module.scss";

function ChartTypeSelect(props) {
  const { label, placeholder, options, handleChartTypeChange } = props;

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
    if (options && options.length > 0) {
      setSelectOptions(formatSelectData(options));
    }
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
        enabled: selectData.value === data.value ? true : false,
      };
    });
    handleChartTypeChange(selectData.value)
    setSelectOptions(updateOptions);
    setSelectedDisplay(selectData);
    toggleDropdown();
  };

  return (
    <div ref={ref} className={`select-custom ${styles.wrapper}`}>
      <h1>{label}</h1>

      <div className={styles.select__wrapper}>
        <button
          className={`btn ${isOpen ? styles.active : ""}`}
          onClick={toggleDropdown}
        >
          {!selectedDisplay ? placeholder : selectedDisplay.label} <DownArrow />
        </button>
        {!isOpen || (
          <ul className={`list-group ${styles.dropdown}`}>
            {selectOptions.map((data, i) => (
              <li key={i} className="list-group-item">
                <button
                  className={`${!data.enabled || styles.active}`}
                  onClick={() => handleDropdownSelect(data)}
                >
                  <h1>{data.label}</h1>{" "}
                  {!data.labelSmall || <small>{data.labelSmall}</small>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChartTypeSelect;
