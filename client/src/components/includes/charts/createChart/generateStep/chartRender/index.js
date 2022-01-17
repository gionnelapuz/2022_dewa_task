import React, { useEffect, useState } from "react";
import { ScatterChart } from "recharts";
import { useDatasets } from "../../../../../../resources/services/contexts/createGraphProvider/datasetProvider";
import { useGraphRender } from "../../../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";
import AreaChart from "../../../chartTypes/areaChart";
import BarChart from "../../../chartTypes/barChart";
import LineChart from "../../../chartTypes/lineChart";

function ChartRender(props) {
  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();
  const [chartType, setChartType, chartData, setChartData] = useGraphRender();

  const renderGraph = () => {
    switch (chartType) {
      case "lineChart":
        return <LineChart data={chartData} />;
      case "areaChart":
        return <AreaChart data={chartData} />;
        case "barChart":
          return <BarChart data={chartData} />;
      default:
        break;
    }
  };

  return !chartType || renderGraph();
}

export default ChartRender;
