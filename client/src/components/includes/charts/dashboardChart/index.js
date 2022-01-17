import React, { memo, useEffect, useState } from "react";

import * as ApiExternal from "../../../../api/external";
import * as ApiChart from "../../../../api/chart";
import {
  generateChartData,
  retrieveDataSet,
} from "../../../../utils/dataSetHelpers";
import AreaChart from "../chartTypes/areaChart";
import BarChart from "../chartTypes/barChart";
import LineChart from "../chartTypes/lineChart";

import DeleteIcon from "@mui/icons-material/Delete";

import "./dashboardChart.scss";
import { ScatterChart } from "recharts";

function DashboardChart(props) {
  const { data } = props;
  const { url, dataSetKey, chartTypeKey, chartKeys } = data.keys;

  const [chartType, setChartType] = useState(null);
  const [chartData, setChartData] = useState({
    keys: {},
    items: [],
  });

  useEffect(() => {
    if (data) {
      getExternalData();
    }
  }, [data]);

  const getExternalData = () => {
    ApiExternal.getData(url)
      .then((res) => {
        getDataSetFromResponse(res.data);
      })
      .catch((error) => {});
  };

  const deleteChart = () => {
    ApiChart.deleteChart({
      id: data.id,
    })
      .then((res) => {})
      .catch((error) => {});
  };

  const getDataSetFromResponse = (responseDataSet) => {
    console.log(chartTypeKey);
    setChartType(chartTypeKey);
    let dataSetFromResponse = retrieveDataSet(responseDataSet, dataSetKey);

    let generatedChartData = generateChartData(dataSetFromResponse, chartKeys);
    setChartData(generatedChartData);
  };

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

  return (
    <div className="dashboardChart">
      <div className="dashboardChart__wrapper">
        <div className="dashboardChart__header">
          <h1>{data.title}</h1>
          {/* <button className="btn" onClick={() => deleteChart()}>
            <DeleteIcon  />
          </button> */}
        </div>
        {renderGraph()}
      </div>
    </div>
  );
}

export default memo(DashboardChart);
