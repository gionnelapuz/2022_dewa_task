import React, { memo, useEffect, useState } from "react";

import DashboardChartItem from "../DashboardChartItem";

import * as ApiCharts from "../../../../api/chart";

import styles from "./dashboardChartList.module.scss";

import Loading from "../../Loading";

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
    ApiCharts.getAll().then((res) => {
      setDashboardGraphs(res.data);
      setIsLoading(false);
    });
  };

  const deleteDashboardChart = (id) => {
    ApiCharts.deleteChart({
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
              deleteDashboardChart={deleteDashboardChart}
            />
          ))
        : renderEmpty()}
    </div>
  );

  return isLoading ? <Loading /> : renderList();
}

export default memo(DashboardChartList);
