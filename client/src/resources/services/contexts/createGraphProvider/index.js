import React from "react";

import DatasetProvider from "./datasetProvider";
import DataSourceProvider from "./dataSourceProvider";
import GraphRenderProvider from "./graphRenderProvider";
import StepsProvider from "./stepsProvider";

function CreateGraphProvider({ children }) {
  return (
    <StepsProvider>
      <DataSourceProvider>
        <DatasetProvider>
          <GraphRenderProvider>{children}</GraphRenderProvider>
        </DatasetProvider>
      </DataSourceProvider>
    </StepsProvider>
  );
}

export default CreateGraphProvider;
