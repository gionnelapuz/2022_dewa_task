import React, { useEffect, useState } from "react";
import { useDatasets } from "../../../../../../../services/contexts/chartProvider/datasetProvider";
import { useChartRender } from "../../../../../../../services/contexts/chartProvider/chartRenderProvider";
import { chartVariables } from "../../../../RenderChartType/config";

import GenerateChartVariableSelect from "./GenerateChartVariableSelect";

import {
  mapChartData,
  removeObjectItemByKeyV1,
} from "../../../../../../../utils/charts/chartHelpers";

import styles from "./generateChartVariables.module.scss";

function GenerateChartVariables() {
  const { selectedDataSet } = useDatasets();
  const { chartType, chartData, setChartData } = useChartRender();

  const [selectedHeaders, setSelectedHeaders] = useState({});
  const [chartOptions, setChartOptions] = useState([]);

  useEffect(() => {
    if (chartType) {
      setSelectedHeaders({});
      setChartOptions(formatChartVariableOptions());
    }
  }, [chartType]);

  const formatChartVariableOptions = () => {
    let chartOptions = chartVariables[chartType];
    const chartHeaders = selectedDataSet.headers;
    return chartOptions.map((data) => {
      return {
        ...data,
        headers: chartHeaders,
      };
    });
  };

  const handleSelectedHeaders = (data) => setSelectedHeaders(data);

  const handleChartAction = (action, optionKey, dataKey) => {
    switch (action) {
      case "change":
        handleChartDataChange(optionKey, dataKey);
        break;
      case "remove":
        handleChartDataRemove(optionKey);
        break;
      default:
        break;
    }
  };

  const handleChartDataChange = (optionKey, dataKey) => {
    const mappedData = mapChartData(
      optionKey,
      dataKey,
      selectedDataSet.items,
      chartData
    );
    setChartData(mappedData);
  };

  const handleChartDataRemove = (optionKey) => {
    const mappedData = removeObjectItemByKeyV1(chartData, optionKey);
    setChartData(mappedData);
  };

  const render = () => (
    <div className={styles.wrapper}>
      <h1>Variables</h1>

      <ul className={styles.options}>
        {chartOptions.map((data, i) => (
          <li className={styles.options__item} key={i}>
            <GenerateChartVariableSelect
              label={data.label}
              placeholder={"Select"}
              options={data}
              selectedHeaders={selectedHeaders}
              handleSelectedHeaders={handleSelectedHeaders}
              handleChartAction={handleChartAction}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return !chartType || render();
}

export default GenerateChartVariables;
