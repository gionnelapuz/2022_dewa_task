import React, { useContext, useState } from "react";

const DatasetContext = React.createContext();

export function useDatasets() {
  return useContext(DatasetContext);
}

function DatasetProvider({ children }) {
  const [datasetItems, setDatasetItems] = useState([]);
  const [dataset, setDataset] = useState({});
  const [dataSetKey, setDataSetKey] = useState(null);

  const resetDataSet = () => {
    setDataset({});
  };

  return (
    <DatasetContext.Provider
      value={[datasetItems, dataset, setDatasetItems, setDataset, resetDataSet, dataSetKey, setDataSetKey]}
    >
      {children}
    </DatasetContext.Provider>
  );
}

export default DatasetProvider;
