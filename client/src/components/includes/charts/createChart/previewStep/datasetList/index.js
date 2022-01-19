import React, { useEffect } from "react";

import { useDatasets } from "../../../../../../resources/services/contexts/chartProvider/datasetProvider";

import styles from "./dataSetList.module.scss";

function DataSetList() {
  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();

  useEffect(() => {
    if (datasetItems.length < 2) {
      handleSelectedDataSet(datasetItems[0]);
    }
  }, [datasetItems]);

  const handleSelectedDataSet = (item) => {
    setDataset({
      ...item,
      items: JSON.parse(item.items),
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1>Select {datasetItems.length > 1 ? 'Datasets' : 'Dataset'}</h1>
      <div className={styles.items}>
        {datasetItems.map((item, i) => {
          const itemsLength = JSON.parse(item.items).length;
          return (
            <div key={i} className={styles.item}>
              <div className={styles.item__header}>
                {item.title}
                <small>
                  {itemsLength} {itemsLength > 1 ? "items" : "item"}
                </small>
              </div>
              <div className={styles.item__body}>
                <pre className={``}>{item.items}</pre>
              </div>
              <div className={styles.item__footer}>
                <button
                  className={`btn btn--green btn-sm ${
                    dataset.title !== item.title || styles.active
                  }`}
                  disabled={dataset.title === item.title}
                  onClick={() => handleSelectedDataSet(item)}
                >
                  {dataset.title !== item.title ? "Select" : "Selected"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataSetList;
