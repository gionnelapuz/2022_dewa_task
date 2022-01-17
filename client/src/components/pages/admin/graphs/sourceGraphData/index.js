import React, { useEffect } from "react";

import DataSourceSelector from "../../../../includes/charts/createChart/loadingStep/dataSourceSelector";

import { useSteps } from "../../../../../resources/services/contexts/createGraphProvider/stepsProvider";
import { useDataSource } from "../../../../../resources/services/contexts/createGraphProvider/dataSourceProvider";

import "./sourceGraphData.scss";
import { Link } from "react-router-dom";

function SourceGraphData() {
  const [step, moveBackward, moveForward] = useSteps();
  const [source, setSource, renderSource] = useDataSource();

  return (
    <div className="loadGraphData container">
      <div className="header">
        <h1>Step {step}: Load Data</h1>
        <Link to={'/'} className="btn btn--green btn-sm">Cancel</Link>
      </div>

      <DataSourceSelector />

      {renderSource()}
    </div>
  );
}

export default SourceGraphData;
