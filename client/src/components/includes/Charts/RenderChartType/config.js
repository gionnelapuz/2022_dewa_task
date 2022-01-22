import {
  variables as lineChartVariables,
  options as lineChartOptions,
} from "./LineChart";

import {
  variables as areaChartVariables,
  options as areaChartOptions,
} from "./AreaChart";

import {
  variables as barChartVariables,
  options as barChartOptions,
} from "./BarChart";

import {
  variables as scatterChartVariables,
  options as scatterChartOptions,
} from "./ScatterChart";

export const chartVariables = {
  LineChart: lineChartVariables,
  AreaChart: areaChartVariables,
  BarChart: barChartVariables,
  ScatterChart: scatterChartVariables,
};

export const chartOptions = {
  lineChart: lineChartOptions,
  areaChart: areaChartOptions,
  barChart: barChartOptions,
  scatterChart: scatterChartOptions,
};
