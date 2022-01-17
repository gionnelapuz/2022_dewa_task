import React, { useEffect, useState } from "react";
import { useDatasets } from "../../../../../../resources/services/contexts/createGraphProvider/datasetProvider";
import { useGraphRender } from "../../../../../../resources/services/contexts/createGraphProvider/graphRenderProvider";
import { chartVariablesOptions } from "../../../../../../utils/charts/chartConfigs";
import { mapLineChartData, removeObjectByKey, removeObjectItemByKey, removeObjectItemByKeyV2 } from "../../../../../../utils/charts/chartHelpers";
import ChartOptionVariablesSelect from "../chartOptionVariablesSelect";

import styles from "./chartVariablesOptions.module.scss";

function ChartVariablesOptions() {
  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();
  const [chartType, setChartType, chartData, setChartData] = useGraphRender();

  const [selectedHeaders, setSelectedHeaders] = useState({});

  useEffect(() => {
    if (chartType) {
      setChartOptions(formatChartVariableOptions());
    }
  }, [chartType]);


  // useEffect(() => {
  //   console.log(chartData)
  // }, [chartData]);

  const [chartOptions, setChartOptions] = useState([]);

  const formatChartVariableOptions = () => {
    let chartOptions = chartVariablesOptions[chartType];
    const chartHeaders = dataset.headers;
    return chartOptions.map((data) => {
      return {
        ...data,
        headers: chartHeaders,
      };
    });
  };

  const handleChartDataChange = ({ optionKey, dataKey }) => {
    const mappedData = mapLineChartData(
      optionKey,
      dataKey,
      dataset.items,
      chartData
    );
    setChartData(mappedData);
  };
  const handleChartDataRemove = ({ optionKey, dataKey }) => {
    const remappedData = removeObjectItemByKeyV2(chartData, optionKey, dataKey)
    
    setChartData(remappedData);
    
  };

  const handleSelectedHeaders = (data) => setSelectedHeaders(data);

  const render = () => (
    <div className={styles.wrapper}>
      <h1>Variables</h1>

      <div className="row">
        {chartOptions.map((data, i) => (
          <div className="col-4" key={i}>
            <ChartOptionVariablesSelect
              label={data.label}
              placeholder={"Select"}
              options={data}
              selectedHeaders={selectedHeaders}
              handleSelectedHeaders={handleSelectedHeaders}
              handleChartDataChange={handleChartDataChange}
              handleChartDataRemove={handleChartDataRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return !chartType || render();
}

export default ChartVariablesOptions;