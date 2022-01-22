import React, { useContext, useState } from "react";

const DatasetContext = React.createContext();

export function useDatasets() {
  return useContext(DatasetContext);
}

function DatasetProvider({ children }) {
  const [datasetItems, setDatasetItems] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState({});

  const resetDataSetItems = () => setDatasetItems([]);

  const resetSelectedDataSet = () => setSelectedDataSet({});

  const resetDataSet = () => {
    setDatasetItems([]);
    setSelectedDataSet({});
  };

  return (
    <DatasetContext.Provider
      value={{
        datasetItems,
        setDatasetItems,
        selectedDataSet,
        setSelectedDataSet,
        resetDataSetItems,
        resetSelectedDataSet,
        resetDataSet
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
}

export default DatasetProvider;
