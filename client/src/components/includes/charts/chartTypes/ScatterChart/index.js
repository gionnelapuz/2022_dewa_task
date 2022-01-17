import React, { useEffect, useState } from "react";

import { BarChart as BarChartComponent, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const variableOptions = [
  {
    key: "bar1",
    label: "Bar 1",
    required: true,
  },
  {
    key: "bar2",
    label: "Bar 2",
    required: false,
  },
  {
    key: "bar3",
    label: "Bar 3",
    required: false,
  },
];

export const customizeOptions = {
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  cartesianGrid: {
    enabled: true,
    elementType: "checkbox",
  },
  xAxis: {
    title: "X-Axis",
    enabled: true,
    elementType: "checkbox",
    dataKey: "name",
    label: {
      title: "Label",
      enabled: false,
      elementType: "input",
      angle: 0,
      offset: -6,
      position: "insideBottom",
    },
  },
  yAxis: {
    title: "Y-Axis",
    enabled: true,
    type: "checkbox",
    dataKey: "name",
    label: {
      title: "Label",
      enabled: false,
      angle: -90,
      offset: -5,
      position: "insideLeft",
    },
  },
  values: {},
};

function BarChart(props) {
  const { data } = props;
  const { keys, items } = data;

  const options = customizeOptions;

  const optionsMargin = options.margin;
  const optionsCartesianGrid = options.cartesianGrid;
  const optionsXAxis = options.xAxis;
  const optionsYAxis = options.yAxis;

  useEffect(() => {
    formatChartItems();
  }, [data]);

  const [chartData, setChartData] = useState([]);

  const formatChartItems = () => {
    let formattedData = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];

      let obj = {};
      Object.keys(element).forEach((key) => {
        const dataKey = keys[key];
        const dataValue = element[key][dataKey];
        obj[dataKey] = dataValue;
      });
      formattedData.push(obj);
    }
    setChartData(formattedData);
  };

  const renderBars = () => {
    return Object.keys(keys).map((key, i) => {
      const dataKey = keys[key];
      return <Bar key={i} name={dataKey} type="monotone" dataKey={dataKey} />;
    });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartComponent data={chartData} margin={optionsMargin}>
        <CartesianGrid />
        {!optionsXAxis.enabled || (
          <XAxis dataKey={optionsXAxis.dataKey}>
           
          </XAxis>
        )}

        {!optionsYAxis.enabled || (
          <YAxis>
           
          </YAxis>
        )}
        <Tooltip />
        {renderBars()}
      </BarChartComponent>
    </ResponsiveContainer>
  );
}

export default BarChart;
