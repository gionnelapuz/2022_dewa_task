import React, { useEffect, useState } from "react";

import {
  LineChart as LineChartComponent,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

export const variableOptions = [
  {
    key: "xAxis",
    label: "x-axis",
    required: true,
  },
  {
    key: "yAxis",
    label: "y-axis",
    required: true,
  }
];

export const customizeOptions = {
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
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
  }
};

function LineChart(props) {
  const { data } = props;
  const { keys, items } = data;

  const options = customizeOptions;
  const optionsMargin = options.margin;
  const optionsXAxis = options.xAxis;
  const optionsYAxis = options.yAxis;

  useEffect(() => {
    if(data){

      formatChartItems();
    }
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

  const renderLine = () => {
    return Object.keys(keys).map((key, i) => {
      const dataKey = keys[key];
      return (
        <Line
          key={i}
          name={dataKey}
          type="monotone"
          dataKey={dataKey}
          // stroke={'red'}
        />
      );
    });
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartComponent data={chartData} margin={optionsMargin}>
        <CartesianGrid />
        {!optionsXAxis.enabled || (
          <XAxis dataKey={optionsXAxis.dataKey}>
            {!optionsXAxis.label.enabled || (
              <Label
                value={optionsXAxis.label.title}
                angle={optionsXAxis.label.angle}
                offset={optionsXAxis.label.offset}
                position={optionsXAxis.label.position}
              />
            )}
          </XAxis>
        )}

        {!optionsYAxis.enabled || (
          <YAxis>
            {!optionsYAxis.label.enabled || (
              <Label
                value={optionsYAxis.label.title}
                angle={optionsYAxis.label.angle}
                offset={optionsYAxis.label.offset}
                position={optionsYAxis.label.position}
              />
            )}
          </YAxis>
        )}
        <Tooltip />

        {renderLine()}
      </LineChartComponent>
    </ResponsiveContainer>
  );
}

export default LineChart;
