import React, { lazy, Suspense, useEffect } from "react";

import RenderSourceSelect from "../../../../includes/Charts/CreateChart/SourceStep/RenderSourceSelect";

import { useDataSource } from "../../../../../services/contexts/chartProvider/dataSourceProvider";

import { Link } from "react-router-dom";

import "./sourceStep.scss";

function SourceStep() {
  const { source } = useDataSource();

  const SourceSelectItem = lazy(() =>
    import(`./RenderSourceSelect/${source}Source`)
  );

  return (
    <div className="loadChartData container">
      <div className="header">
        <h1>Step 1: Load Data</h1>
        <Link to={"/"} className="btn btn--green btn-sm">
          Cancel
        </Link>
      </div>

      <RenderSourceSelect />

      <Suspense fallback={null}>
        <SourceSelectItem />
      </Suspense>
    </div>
  );
}

export default SourceStep;
