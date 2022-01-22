import React from "react";

import { useSteps } from "../../../../../services/contexts/chartProvider/stepsProvider";
import { useDatasets } from "../../../../../services/contexts/chartProvider/datasetProvider";
import { useDataSource } from "../../../../../services/contexts/chartProvider/dataSourceProvider";

import PreviewList from "../../../../includes/Charts/CreateChart/PreviewStep/PreviewList";
import PreviewTable from "../../../../includes/Charts/CreateChart/PreviewStep/PreviewTable";

import { isObjectEmpty } from "../../../../../utils/validation";

import styles from "./previewStep.module.scss";

function PreviewStep() {
  const { moveStep } = useSteps();
  const { resetDataSource } = useDataSource();
  const { selectedDataSet, resetDataSet } = useDatasets();

  const goBack = () => {
    moveStep("Source");
    resetDataSource();
    resetDataSet();
  };

  const goNext = () => {
    moveStep("Generate");
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <button className="btn btn--green btn-sm" onClick={goBack}>
          Back
        </button>
        <h1>
          <span>Step 2:</span> Select and Confirm Dataset
        </h1>
        <button
          className="btn btn--green btn-sm"
          disabled={isObjectEmpty(selectedDataSet)}
          onClick={goNext}
        >
          Next
        </button>
      </div>

      <PreviewList />

      <PreviewTable />
    </div>
  );
}

export default PreviewStep;
