import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useSteps } from "../../../../../resources/services/contexts/createGraphProvider/stepsProvider";
import { useDatasets } from "../../../../../resources/services/contexts/createGraphProvider/datasetProvider";

import DataSetList from "../../../../includes/charts/createChart/previewStep/datasetList";
import DataSetTable from "../../../../includes/charts/createChart/previewStep/datasetTable";

import "./previewGraphData.scss";
import { isObjectEmpty } from "../../../../../utils/validation";
import { removeObjectsAndArrays } from "../../../../../utils/dataSetHelpers";
import { useDataSource } from "../../../../../resources/services/contexts/createGraphProvider/dataSourceProvider";

function PreviewGraphData() {
  const [source, setSource, renderSource, url, setUrl] = useDataSource();
  const [step, moveBackward, moveForward, renderStep] = useSteps();
  const [datasetItems, dataset, setDatasetItems, setDataset, resetDataSet] =
    useDatasets();

  const [tableHeaders, setTableHeaders] = useState(null);

  const handleTableHeaders = (headers) => setTableHeaders(headers);

  const goBack = () => {
    setUrl(null)
    resetDataSet();
    moveBackward();
  };

  const goNext = () => {
    const updatedArray = removeObjectsAndArrays(dataset.items);

    setDataset({ ...dataset, items: updatedArray, headers: tableHeaders });
    moveForward();
  };

  return (
    <div className="previewGraphData container">
      <div className="header">
        <button className="btn btn--green btn-sm" onClick={goBack}>
          Back
        </button>
        <h1>
          <span>Step {step}:</span> Select and Confirm Dataset
        </h1>
        <button
          className="btn btn--green btn-sm"
          disabled={isObjectEmpty(dataset)}
          onClick={goNext}
        >
          Next
        </button>
      </div>

      <DataSetList />

      <DataSetTable handleTableHeaders={handleTableHeaders} />
    </div>
  );
}

export default PreviewGraphData;
