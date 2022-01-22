import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useSteps } from "../../../../../services/contexts/chartProvider/stepsProvider";
import { useDataSource } from "../../../../../services/contexts/chartProvider/dataSourceProvider";
import { useDatasets } from "../../../../../services/contexts/chartProvider/datasetProvider";
import { useChartRender } from "../../../../../services/contexts/chartProvider/chartRenderProvider";

import GenerateChartForm from "./GenerateChartForm";
import RenderChartType from "../../../../includes/Charts/RenderChartType";

import * as ApiUserChart from "../../../../../api/charts/userCharts";

import styles from "./generateStep.module.scss";

function GenerateChart() {
  const navigate = useNavigate();

  const { moveStep, resetStep } = useSteps();
  const { url, resetDataSource } = useDataSource();
  const { selectedDataSet, resetDataSet } = useDatasets();
  const { chartType, chartData, resetChartFields } = useChartRender();

  const [errors, setErrors] = useState({});

  const [chartTitle, setChartTitle] = useState("");

  const goBack = () => {
    resetChartFields();
    moveStep("Preview");
  };

  const resetAllFields = () => {
    resetStep();
    resetDataSource();
    resetDataSet();
    resetChartFields();
  };

  const handleSetChartTitle = (event) => setChartTitle(event.target.value);

  const handleValidateForm = () => {
    let errors = {};

    if (chartTitle.length <= 0) {
      errors.chartTitle = true;
    }

    if (!chartType) {
      errors.chartType = true;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return true;
    }

    storeChart();
    return false;
  };

  const storeChart = () => {
    ApiUserChart.storeChart({
      title: chartTitle,
      keys: {
        url,
        dataSetKey: selectedDataSet.title,
        chartTypeKey: chartType,
        chartKeys: chartData.keys,
      },
    })
      .then((res) => {
        resetAllFields();

        navigate("/");
      })
      .catch((error) => {
        alert("There was an error, please try again");
      });
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <button className="btn btn--green btn-sm" onClick={goBack}>
          Back
        </button>
        <h1>
          <span>Step 3:</span> {url ? "Generate Graph" : "Preview Graph"}
        </h1>

        {url ? (
          <button
            className="btn btn--green btn-sm"
            onClick={() => handleValidateForm()}
          >
            Create
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <GenerateChartForm
        errors={errors}
        chartTitle={chartTitle}
        handleSetChartTitle={handleSetChartTitle}
      />

      {!chartType || (
        <div className={styles.chartRender}>
          <h1>Preview Chart</h1>
          <RenderChartType type={chartType} data={chartData} />
        </div>
      )}
    </div>
  );
}

export default GenerateChart;
