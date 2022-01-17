import React, { useContext, useState } from "react";

import DataFromPaste from "../../../../../components/includes/charts/createChart/loadingStep/dataFromPaste";
import DataFromURL from "../../../../../components/includes/charts/createChart/loadingStep/dataFromUrl";

const DataSourceContext = React.createContext();

export function useDataSource() {
  return useContext(DataSourceContext);
}

function DataSourceProvider({ children }) {
  const [source, setSource] = useState("url");
  const [url, setUrl] = useState(null);

  const renderSource = () => {
    switch (source) {
      case "url":
        return <DataFromURL />;
      case "paste":
        return <DataFromPaste />;
      default:
        break;
    }
  };

  const resetDataSource = () => {
    setSource("url");
    setUrl(null)
  }

  return (
    <DataSourceContext.Provider value={[source, setSource, renderSource, url, setUrl, resetDataSource]}>
      {children}
    </DataSourceContext.Provider>
  );
}

export default DataSourceProvider;
