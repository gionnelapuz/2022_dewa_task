import React, { useEffect, useState } from "react";

import { useDatasets } from "../../../../../../resources/services/contexts/createGraphProvider/datasetProvider";
import { isObjectEmpty, isArrayOrObject, isValidArray } from "../../../../../../utils/validation";

import styles from "./dataSetTable.module.scss";

function DataSetTable(props) {
  const { handleTableHeaders } = props;

  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();

  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (isValidArray(dataset.items)) {
      getDynamicHeaders();
    }
  }, [dataset]);

  const getDynamicHeaders = () => {
    const datasetItems = dataset.items;

    let tableHeadersArray = [];

    for (let index = 0; index < datasetItems.length; index++) {
      const element = datasetItems[index];

      Object.keys(element).forEach((data, i) => {
        if (
          !tableHeadersArray.includes(data) &&
          typeof element[data] !== "object" &&
          element[data] !== ""
        ) {
          tableHeadersArray.push(data);
        }
      });
    }
    handleTableHeaders(tableHeadersArray);
    setTableHeaders(tableHeadersArray);
  };

  const renderDynamicTableHeaderElements = () => {
    return (
      <tr>
        {tableHeaders.map((data, i) => (
          <th scope="col" key={i}>
            {data}
          </th>
        ))}
      </tr>
    );
  };

  const renderDynamicTableBodyRow = () => {
    const datasetItems = dataset.items;
    return datasetItems.map((item, i) => (
      <tr key={i}>{renderDynamicTableBodyRowElements(item)}</tr>
    ));
  };

  const renderDynamicTableBodyRowElements = (item) => {
    return Object.keys(item).map((key, i) => {
      let element = item[key];

      if (element === "") {
        delete item[key];
      }

      if (typeof element === "object") {
        delete item[key];
      }

      return i === 0 ? (
        <th key={i} scope="row">
          {element}
        </th>
      ) : (
        <td key={i}> {element}</td>
      );
    });
  };

  const renderTable = () => {
    return (
      <div className={styles.wrapper__table}>
        <h1>Table Preview</h1>
        <table className="table table-bordered table-hover table-responsive">
          <thead>{renderDynamicTableHeaderElements()}</thead>
          {/* <tbody>{renderDynamicTableBodyRow()}</tbody> */}
        </table>
        <div className={styles.caption}>
          <span>
            {dataset.items.length} {dataset.items.length > 1 ? "rows" : "row"}
          </span>{" "}
          generated from <span>{dataset.title}</span> dataset
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {tableHeaders.length <= 0 || renderTable()}
    </div>
  );
}

export default DataSetTable;
