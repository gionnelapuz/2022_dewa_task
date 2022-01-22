import React, { useContext, useState } from "react";

const DataSourceContext = React.createContext();

export function useDataSource() {
  return useContext(DataSourceContext);
}

function DataSourceProvider({ children }) {
  const [source, setSource] = useState("Url");
  const [url, setUrl] = useState(null);

  const resetDataSource = () => {
    setSource("Url");
    setUrl(null)
  }

  return (
    <DataSourceContext.Provider value={{source, setSource, url, setUrl, resetDataSource}}>
      {children}
    </DataSourceContext.Provider>
  );
}

export default DataSourceProvider;
