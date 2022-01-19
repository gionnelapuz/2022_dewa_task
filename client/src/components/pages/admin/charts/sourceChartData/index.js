import React, { useEffect } from "react";

import DataSourceSelector from "../../../../includes/charts/createChart/loadingStep/dataSourceSelector";

import { useSteps } from "../../../../../resources/services/contexts/chartProvider/stepsProvider";
import { useDataSource } from "../../../../../resources/services/contexts/chartProvider/dataSourceProvider";

import { Link } from "react-router-dom";

import "./sourceChartData.scss";

function SourceChartData() {
  const [step, moveBackward, moveForward] = useSteps();
  const [source, setSource, renderSource] = useDataSource();

  return (
    <div className="loadChartData container">
      <div className="header">
        <h1>Step {step}: Load Data</h1>
        <Link to={"/"} className="btn btn--green btn-sm">
          Cancel
        </Link>
      </div>

      <DataSourceSelector />

      {renderSource()}
    </div>
  );
}

export default SourceChartData;
