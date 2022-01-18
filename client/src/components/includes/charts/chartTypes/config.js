import { variables as lineChartVariables, options as lineChartOptions } from "./lineChart";

import { variables as areaChartVariables, options as areaChartOptions } from "./areaChart";

import { variables as barChartVariables, options as barChartOptions } from "./barChart";

import ScatterChart, {
  variables as scatterChartVariables,
  options as scatterChartOptions
} from "./scatterChart";

export const chartVariables = {
  lineChart: lineChartVariables,
  areaChart: areaChartVariables,
  barChart: barChartVariables,
  scatterChart: scatterChartVariables,
};

export const chartOptions = {
  lineChart: lineChartOptions,
  areaChart: areaChartOptions,
  barChart: barChartOptions,
  scatterChart: scatterChartOptions,
};
