import React, { useEffect } from "react";

import { useDatasets } from "../../../../../../services/contexts/chartProvider/datasetProvider";

import styles from "./previewList.module.scss";

function PreviewList() {
  const { datasetItems, selectedDataSet, setSelectedDataSet } = useDatasets();

  useEffect(() => {
    if (datasetItems.length < 2) {
      setSelectedDataSet(datasetItems[0]);
    }
  }, [datasetItems]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Select {datasetItems.length > 1 ? "Datasets" : "Dataset"}
      </h1>
      <div className={styles.items}>
        {datasetItems.map((item, i) => {
          const itemsLength = item.items.length;
          return (
            <div key={i} className={styles.item}>
              <div className={styles.item__header}>
                {item.title}
                <small>
                  {itemsLength} {itemsLength > 1 ? "items" : "item"}
                </small>
              </div>
              <div className={styles.item__body}>
                <pre>{JSON.stringify(item.items, undefined, 2)}</pre>
              </div>

              <div className={styles.item__footer}>
                <button
                  className={`btn btn--green btn-sm ${
                    selectedDataSet.title === item.title ? styles.active : ""
                  }`}
                  disabled={selectedDataSet.title === item.title}
                  onClick={() => setSelectedDataSet(item)}
                >
                  {selectedDataSet.title !== item.title ? "Select" : "Selected"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PreviewList;
