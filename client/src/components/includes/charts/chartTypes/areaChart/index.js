import React, { useEffect, useState } from "react";

import {
  AreaChart as AreaChartComponent,
  Area,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from "recharts";
import { generateRandomHexColor } from "../../../../../utils/charts/chartHelpers";

export const variableOptions = [
  {
    key: "area1",
    label: "Area 1",
    required: true,
  },
  {
    key: "area2",
    label: "Area 2",
    required: true,
  },
  {
    key: "area3",
    label: "Area 3",
    required: true,
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

function AreaChart(props) {
  const { data, threshold } = props;
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

  const renderArea = () => {
    return Object.keys(keys).map((key, i) => {
      const dataKey = keys[key];
      return <Area key={i} name={dataKey} type="monotone" dataKey={dataKey} 
      fill={generateRandomHexColor()} />;
    });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChartComponent data={chartData} margin={optionsMargin}>
        <CartesianGrid />
        {!optionsXAxis.enabled || (
          <XAxis
            dataKey={optionsXAxis.dataKey}
            formatter={(value) => {
              let formatted = value;
              if (!isNaN(value)) {
                formatted = value.toLocaleString("en-US");
              }

              return formatted;
            }}
          >
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
          <YAxis
            formatter={(value) => {
              let formatted = value;
              if (!isNaN(value)) {
                formatted = value.toLocaleString("en-US");
              }

              return formatted;
            }}
          >
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

        {threshold.length > 0 ? (
          <ReferenceLine
            label={"threshold"}
            y={parseInt(threshold)}
            stroke={"#076b2e"}
            alwaysShow
            style={{ fontSize: "10px" }}
          >
            <Label
              value={parseInt(threshold)}
              position="left"
              style={{ fontSize: "12px" }}
            />
          </ReferenceLine>
        ) : null}

        {renderArea()}
      </AreaChartComponent>
    </ResponsiveContainer>
  );
}

export default AreaChart;
