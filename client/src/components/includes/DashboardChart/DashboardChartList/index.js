import React, { memo, useEffect, useState } from "react";

import Loading from "../../Loading";
import DashboardChartItem from "../DashboardChartItem";

import * as ApiUserChart from "../../../../api/charts/userCharts";

import styles from "./dashboardChartList.module.scss";

function DashboardChartList() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardGraphs, setDashboardGraphs] = useState([]);

  useEffect(() => {
    getDashboardCharts();
  }, []);

  const removeChartFromList = (id) => {
    let array = [...dashboardGraphs];
    const filteredArray = array.filter((data) => data.id !== id);
    setDashboardGraphs(filteredArray);
  };

  const getDashboardCharts = () => {
    ApiUserChart.getAllCharts().then((res) => {
      setDashboardGraphs(res.data);
      setIsLoading(false);
    });
  };

  const deleteChart = (id) => {
    ApiUserChart.deleteChart({
      id,
    }).then(() => {
      removeChartFromList(id);
    });
  };

  const renderEmpty = () => <div className={styles.empty}>Empty Dashboard</div>;

  const renderList = () => (
    <div className={styles.list}>
      {dashboardGraphs.length > 0
        ? dashboardGraphs.map((dashboardGraph, i) => (
            <DashboardChartItem
              key={i}
              data={dashboardGraph}
              deleteChart={deleteChart}
            />
          ))
        : renderEmpty()}
    </div>
  );

  return isLoading ? <Loading /> : renderList();
}

export default memo(DashboardChartList);
