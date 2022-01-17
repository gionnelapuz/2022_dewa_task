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

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";

import "./dashboardChart.scss";

import moment from "moment";

function DashboardChart(props) {
  const { data, handleDeleteChart } = props;
  const { url, dataSetKey, chartTypeKey, chartKeys } = data.keys;

  const [chartType, setChartType] = useState(null);
  const [chartData, setChartData] = useState({
    keys: {},
    items: [],
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedOn, setUpdatedOn] = useState(null);

  useEffect(() => {
    if (data) {
      getExternalData();
    }
  }, [data]);

  const getExternalData = () => {
    ApiExternal.getData(url)
      .then((res) => {
        triggerUpdatedOn();
        setIsRefreshing(false);
        getDataSetFromResponse(res.data);
      })
      .catch((error) => {});
  };

  const triggerUpdatedOn = () => {
    let time = moment().format();
  };

  const deleteChart = () => {
    handleDeleteChart(data.id);
    ApiChart.deleteChart({
      id: data.id,
    })
      .then((res) => {})
      .catch((error) => {});
  };

  const refreshChart = () => {
    setIsRefreshing(true);
    getExternalData();
  };

  const getDataSetFromResponse = (responseDataSet) => {
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
          <div className="btn__container">
            <button
              className={`btn refresh ${isRefreshing ? "refreshing" : ""}`}
              disabled={isRefreshing}
              onClick={() => refreshChart()}
            >
              <RefreshIcon />
            </button>
            <button className="btn" onClick={() => deleteChart()}>
              <DeleteIcon />
            </button>
          </div>
        </div>
        {renderGraph()}
        <div className="updatedOn">
          <small className="updatedOn__text">
            <span>Last Updated on:</span>{" "}
            {!updatedOn ? moment().format("MMM DD, YYYY, hh:mm a") : updatedOn}
          </small>
        </div>{" "}
      </div>
    </div>
  );
}

export default DashboardChart;
