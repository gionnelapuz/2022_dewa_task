import React, { useEffect, useState } from "react";

import { useChartRender } from "../../../../../../services/contexts/chartProvider/chartRenderProvider";

import Input from "../../../../Input";
import GenerateChartTypeSelect from "./GenerateChartTypeSelect";
import GenerateChartVariables from "./GenerateChartVariables";

import * as ApiCharts from "../../../../../../api/charts";

import styles from "./generateChartForm.module.scss";

function GenerateChartForm(props) {
  const { errors, chartTitle, handleSetChartTitle } = props;

  const { setChartType, resetChartData } = useChartRender();

  const [chartTypeOptions, setChartTypeOptions] = useState([]);

  useEffect(() => {
    getChartTypes();
  }, []);

  const handleChartTypeChange = (type) => {
    resetChartData();
    setChartType(type);
  };

  const getChartTypes = () => {
    ApiCharts.getAllChartTypes().then((res) => setChartTypeOptions(res.data));
  };

  return (
    <div className={styles.form}>
      <Input
        className={styles.name}
        name="chartTitle"
        label="Graph Title"
        type="text"
        value={chartTitle}
        onChange={handleSetChartTitle}
        error={errors.chartTitle}
      />

      <GenerateChartTypeSelect
        label={"Select Chart"}
        placeholder={"Select"}
        options={chartTypeOptions}
        handleChartTypeChange={handleChartTypeChange}
        error={errors.chartType}
      />

      <GenerateChartVariables />
    </div>
  );
}

export default GenerateChartForm;
