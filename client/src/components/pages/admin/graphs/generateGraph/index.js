import React, { useEffect, useState } from "react";

import { useSteps } from "../../../../../resources/services/contexts/createGraphProvider/stepsProvider";
import { useDatasets } from "../../../../../resources/services/contexts/createGraphProvider/datasetProvider";

import ChartVariablesOptions from "../../../../includes/charts/createChart/generateStep/chartVariablesOptions";

import ChartRender from "../../../../includes/charts/createChart/generateStep/chartRender";
import { useGraphRender } from "../../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";

import { isObjectEmpty, isValidNumber } from "../../../../../utils/validation";
import ChartTypeSelect from "../../../../includes/charts/createChart/generateStep/chartTypeSelect";

import { useDataSource } from "../../../../../resources/services/contexts/createGraphProvider/dataSourceProvider";
import Input from "../../../../includes/input";

import * as ApiChart from "../../../../../api/chart";
import { useNavigate } from "react-router-dom";

import "./generateGraph.scss";

const chartOptions = [
  {
    label: "Line Chart",
    labelSmall: "Time series, correlations",
    value: "lineChart",
  },
  {
    label: "Area Chart",
    labelSmall: "Time series, correlations, proportions",
    value: "areaChart",
  },
  {
    label: "Bar Chart",
    labelSmall: "correlations, proportions",
    value: "barChart",
  },
  {
    label: "Scatter Chart",
    labelSmall: "observe and show relationships between two numeric variables",
    value: "scatterChart",
  },
];

function GenerateGraph() {
  const [step, moveBackward, moveForward, renderStep, resetSteps] = useSteps();
  const [source, setSource, renderSource, url, setUrl, resetDataSource] =
    useDataSource();
  const [datasetItems, dataset, setDatasetItems, setDataset, resetDataSet] =
    useDatasets();

  const [
    chartType,
    setChartType,
    chartData,
    setChartData,
    resetChartFields,
    threshold,
    setThreshold,
    resetChartData
  ] = useGraphRender();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [chartTitle, setChartTitle] = useState("");

  const goBack = () => {
    resetDataSet();
    resetChartFields();
    moveBackward();
  };

  const resetAllFields = () => {
    resetChartFields();
    resetDataSet();
    resetDataSource();
    resetSteps();
  };

  const handleChartTypeChange = (type) => {
    resetChartData()
    setChartType(type)
  };
  const handleTitleInputChange = (event) => setChartTitle(event.target.value);
  const handleChartThresholdChange = (event) =>
    setThreshold(event.target.value);

  const storeChart = () => {
    const keys = {
      url,
      dataSetKey: dataset.title,
      chartTypeKey: chartType,
      chartKeys: chartData.keys,
      chartThreshold: threshold,
    };

    ApiChart.storeChart({
      title: chartTitle,
      keys,
    })
      .then((res) => {
        resetAllFields();

        navigate("/");
      })
      .catch((error) => {
        alert("There was an error, please try again");
      });
  };

  const validateForm = () => {
    let errors = {};

    if (chartTitle.length <= 0) {
      errors.chartTitle = true;
    }

    if (!chartType) {
      errors.chartType = true;
    }

    if (threshold.length > 0 && !isValidNumber(threshold)) {
      errors.chartThreshold =
        "Only numbers allowed here with no dots or commas";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return true;
    }

    storeChart();
    return false;
  };

  const render = () => (
    <div className="generateGraph container">
      <div className="header">
        <button className="btn btn--green btn-sm" onClick={goBack}>
          Back
        </button>
        <h1>
          <span>Step {step}:</span> {url ? "Generate Graph" : "Preview Graph"}
        </h1>

        {url ? <button
          className="btn btn--green btn-sm"
          onClick={() => validateForm()}
        >
          Create
        </button> : <div></div>}
      </div>

      <div className="graphName">
        <Input
          className="form-group"
          name="chartTitle"
          value={chartTitle}
          label="Graph Title"
          type="text"
          onChange={handleTitleInputChange}
          error={errors.chartTitle}
        />
      </div>

      <div className="rowss">
        <ChartTypeSelect
          label={"Select Chart"}
          placeholder={"Select"}
          options={chartOptions}
          handleChartTypeChange={handleChartTypeChange}
          error={errors.chartType}
        />
        {/* <div className="graphReference">
          <Input
            name="chartThreshold"
            label="Graph Threshold"
            type="text"
            value={threshold}
            onChange={handleChartThresholdChange}
            error={errors.chartThreshold}
          />
        </div> */}
      </div>

      <ChartVariablesOptions />

      {!chartType || (
        <div className="chartRender">
          <h1>Chart Preview</h1>
          <ChartRender />
        </div>
      )}
    </div>
  );

  return isObjectEmpty(dataset) || render();
}

export default GenerateGraph;
