import React from "react";

import DatasetProvider from "./datasetProvider";
import DataSourceProvider from "./dataSourceProvider";
import ChartRenderProvider from "./chartRenderProvider";
import StepsProvider from "./stepsProvider";

function ChartProvider({ children }) {
  return (
    <StepsProvider>
      <DataSourceProvider>
        <DatasetProvider>
          <ChartRenderProvider>{children}</ChartRenderProvider>
        </DatasetProvider>
      </DataSourceProvider>
    </StepsProvider>
  );
}

export default ChartProvider;
