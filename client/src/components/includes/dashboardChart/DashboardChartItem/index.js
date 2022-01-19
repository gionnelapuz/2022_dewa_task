import React, { memo, useEffect, useState } from "react";

import * as ApiExternal from "../../../../api/external";
import * as ApiChart from "../../../../api/chart";
import {
  generateChartData,
  retrieveDataSet,
} from "../../../../utils/dataSetHelpers";

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";

import moment from "moment";
import ChartRender from "../../charts/chartRender";

import "./dashboardChartItem.scss";
import Loading from "../../Loading";

function DashboardChartItem(props) {
  const { data, deleteDashboardChart } = props;
  const { url, dataSetKey, chartTypeKey, chartKeys, chartThreshold } =
    data.keys;

  const [chartData, setChartData] = useState({
    keys: {},
    items: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedOn, setUpdatedOn] = useState(null);

  useEffect(() => {
    getExternalData();
  }, []);

  const getExternalData = () => {
    ApiExternal.getData(url).then((res) => {
      if (isLoading) setIsLoading(false);

      triggerUpdateTime();
      setIsRefreshing(false);
      getDataSetFromResponse(res.data);
    });
  };

  const triggerUpdateTime = () => {
    let formatterTime = moment().format("MMM DD, YYYY, hh:mm a");
    setUpdatedOn(formatterTime);
  };

  const refreshChart = () => {
    setIsRefreshing(true);
    getExternalData();
  };

  const getDataSetFromResponse = (responseDataSet) => {
    let dataSetFromResponse = retrieveDataSet(responseDataSet, dataSetKey);

    let generatedChartData = generateChartData(dataSetFromResponse, chartKeys);
    setChartData(generatedChartData);
  };

  const renderItem = () => (
    <div className="dashboardChartItem__wrapper">
      <div className="header">
        <h1>{data.title}</h1>
        <div className="buttons">
          <button
            className={`btn refresh ${isRefreshing ? "refreshing" : ""}`}
            disabled={isRefreshing}
            onClick={() => refreshChart()}
          >
            <RefreshIcon />
          </button>
          <button className="btn" onClick={() => deleteDashboardChart(data.id)}>
            <DeleteIcon />
          </button>
        </div>
      </div>

      <ChartRender type={chartTypeKey} data={chartData} />
      <div className={"time"}>
        <small>
          <span>Updated On:</span> {updatedOn}
        </small>
      </div>
    </div>
  );

  return (
    <div className={`dashboardChartItem ${isLoading ? 'loading' : null}`}>
      {isLoading ? <Loading /> : renderItem()}
    </div>
  );
}

export default memo(DashboardChartItem);
