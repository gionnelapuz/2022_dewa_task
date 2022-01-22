import React, { useEffect, useState } from "react";

import { useDatasets } from "../../../../../../services/contexts/chartProvider/datasetProvider";
import { isObjectEmpty } from "../../../../../../utils/validation";

import styles from "./previewTable.module.scss";

function PreviewTable() {
  const { selectedDataSet } = useDatasets();

  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!isObjectEmpty(selectedDataSet)) {
      setRender(true);
    }
  }, [selectedDataSet]);

  const renderTableHeader = () => (
    <tr>
      {selectedDataSet.headers.map((data, i) => (
        <th scope="col" key={i}>
          {data}
        </th>
      ))}
    </tr>
  );

  const renderTableRow = () =>
    selectedDataSet.items.map((item, i) => (
      <tr key={i}>{renderTableRowElement(item)}</tr>
    ));

  const renderTableRowElement = (item) =>
    Object.keys(item).map((key, i) => {
      let element = item[key];
      return i === 0 ? (
        <th key={i} scope="row">
          {element}
        </th>
      ) : (
        <td key={i}> {element}</td>
      );
    });

  const renderTable = () => (
    <div className={styles.wrapper__table}>
      <h1>Table Preview</h1>
      <table className="table table-bordered table-hover table-responsive">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableRow()}</tbody>
      </table>
      <div className={styles.caption}>
        <span>
          {selectedDataSet.items.length}{" "}
          {selectedDataSet.items.length > 1 ? "rows" : "row"}
        </span>{" "}
        generated from <span>{selectedDataSet.title}</span> dataset
      </div>
    </div>
  );

  return <div className={styles.wrapper}>{!render || renderTable()}</div>;
}

export default PreviewTable;
