import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";

import "./dashboard.scss";
import { Link } from "react-router-dom";
import DashboardChart from "../../../includes/charts/dashboardChart";
import { useGraphRender } from "../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";

import * as ApiCharts from "../../../../api/chart";

function Dashboard() {
  const [chartType, setChartType, chartData, setChartData] = useGraphRender();

  const [dashboardGraphs, setDashboardGraphs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const resetContextValues = () => {
    setChartType(null);
    setChartData({
      keys: {},
      items: [],
    });
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    ApiCharts.getAll()
      .then((res) => {
        setDashboardGraphs(res.data);
        setIsLoading(false)
      })
      .catch((error) => {});
  };

  const handleDeleteChart = (id) => {
    let orignalArray = [...dashboardGraphs];
    const filteredArray = orignalArray.filter((data) => data.id !== id);
    setDashboardGraphs(filteredArray);
  };

  const renderCharts = () =>
    dashboardGraphs.map((data, i) => (
      <DashboardChart
        key={i}
        data={data}
        handleDeleteChart={handleDeleteChart}
      />
    ));

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <Link
          to={"/graph/create"}
          className="btn btn--green"
          onClick={resetContextValues}
        >
          <AddIcon />
        </Link>
      </div>

      {!isLoading ? (
        <div className="body" style={{ height: "200px" }}>
          {dashboardGraphs.length > 0 ? (
            renderCharts()
          ) : (
            <div className="body__empty">
              <span>Dashboard is Empty</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
