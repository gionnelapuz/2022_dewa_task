import React from "react";

import { routes } from "../../../../resources/routes";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import DashboardChartList from "../../../includes/dashboardChart/DashboardChartList";

import styles from "./dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <Link
          to={routes.chartCreate.path}
          className="btn btn--round btn--green"
        >
          <AddIcon />
        </Link>
      </div>

      <DashboardChartList />
    </div>
  );
}

export default Dashboard;
