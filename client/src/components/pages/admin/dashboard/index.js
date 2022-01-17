import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";

import "./dashboard.scss";
import { Link } from "react-router-dom";
import DashboardChart from "../../../includes/charts/dashboardChart";
import { useDatasets } from "../../../../resources/services/contexts/createGraphProvider/datasetProvider";
import { useGraphRender } from "../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";

import * as ApiCharts from "../../../../api/chart";

function Dashboard() {
  const [chartType, setChartType, chartData, setChartData] = useGraphRender();

  const [dashboardGraphs, setDashboardGraphs] = useState([]);

  const resetContextValues = () => {
    setChartType(null);
    setChartData({
      keys: {},
      items: [],
    });
  };

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = () => {
    ApiCharts.getAll()
      .then((res) => {
        console.log(res.data)
        setDashboardGraphs(res.data)
      })
      .catch((error) => {});
  };

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

      <div className="body">
        {dashboardGraphs.map((data, i) => (
          <DashboardChart key={i} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
