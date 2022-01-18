import React, { useEffect, useState } from "react";
import { useDatasets } from "../../../../../../resources/services/contexts/createGraphProvider/datasetProvider";
import { useGraphRender } from "../../../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";
import AreaChart from "../../../chartTypes/areaChart";
import BarChart from "../../../chartTypes/barChart";
import LineChart from "../../../chartTypes/lineChart";
import ScatterChart from "../../../chartTypes/scatterChart";

function ChartRender() {
  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();
  const [
    chartType,
    setChartType,
    chartData,
    setChartData,
    resetChartFields,
    threshold,
    setThreshold,
  ] = useGraphRender();

  const renderGraph = () => {
    switch (chartType) {
      case "lineChart":
        return <LineChart data={chartData} threshold={threshold} />;
      case "areaChart":
        return <AreaChart data={chartData} threshold={threshold} />;
      case "barChart":
        return <BarChart data={chartData} threshold={threshold} />;
        case "scatterChart":
          return <ScatterChart data={chartData} threshold={threshold} />;
      default:
        break;
    }
  };

  return !chartType || renderGraph();
}

export default ChartRender;
