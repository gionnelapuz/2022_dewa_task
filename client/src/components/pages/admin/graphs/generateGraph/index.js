import React, { useEffect, useState } from "react";

import { useSteps } from "../../../../../resources/services/contexts/createGraphProvider/stepsProvider";
import { useDatasets } from "../../../../../resources/services/contexts/createGraphProvider/datasetProvider";

import ChartVariablesOptions from "../../../../includes/charts/createChart/generateStep/chartVariablesOptions";

import ChartRender from "../../../../includes/charts/createChart/generateStep/chartRender";
import { useGraphRender } from "../../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";

import { isObjectEmpty } from "../../../../../utils/validation";
import ChartTypeSelect from "../../../../includes/charts/createChart/generateStep/chartTypeSelect";

import "./generateGraph.scss";
import { useDataSource } from "../../../../../resources/services/contexts/createGraphProvider/dataSourceProvider";
import Input from "../../../../includes/input";

import * as ApiChart from "../../../../../api/chart";
import { useNavigate } from "react-router-dom";

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
    labelSmall: "Correlations",
    value: "barChart",
  },
];

function GenerateGraph() {
  const [step, moveBackward, moveForward, renderStep] = useSteps();
  const [source, setSource, renderSource, url, setUrl] = useDataSource();
  const [datasetItems, dataset, setDatasetItems, setDataset, resetDataSet] =
    useDatasets();

  const [chartType, setChartType, chartData, setChartData, resetChartFields] =
    useGraphRender();

  const navigate = useNavigate();

  const [chartTitle, setChartTitle] = useState("");

  const goBack = () => {
    resetDataSet();
    resetChartFields();
    moveBackward();
  };

  const handleTitleInputChange = (event) => setChartTitle(event.target.value);

  const handleChartTypeChange = (type) => setChartType(type);

  const storeChart = () => {

    const keys = {
      url,
      dataSetKey: dataset.title,
      chartTypeKey: chartType,
      chartKeys: chartData.keys,
    }

    ApiChart.storeChart({
      title: chartTitle,
      keys
    })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        alert("There was an error, please try again");
      });
  };

  const renderCreateButton = () => {
    if (
      chartTitle === null ||
      url === null ||
      chartType === null ||
      isObjectEmpty(chartData.keys)
    ) {
      return (
        <button className="btn btn--green btn-sm" disabled>
          Create
        </button>
      );
    } else {
      return (
        <button className="btn btn--green btn-sm" onClick={() => storeChart()}>
          Create
        </button>
      );
    }
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

        {renderCreateButton()}
      </div>

      <div className="graphName">
        <Input
          className="form-group"
          name="title"
          value={chartTitle}
          label="Graph Title"
          type="text"
          onChange={handleTitleInputChange}
        />
      </div>

      <ChartTypeSelect
        label={"Select Chart"}
        placeholder={"Select"}
        options={chartOptions}
        handleChartTypeChange={handleChartTypeChange}
      />

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
