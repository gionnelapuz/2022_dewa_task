import React, { memo, useEffect, useMemo, useState } from "react";

import moment from "moment";

import {
  ScatterChart as ScatterChartComponent,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  LabelList,
} from "recharts";
import { generateRandomHexColor } from "../../../../../utils/charts/chartHelpers";

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
    right: 10,
    bottom: 0,
    left: 10,
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
};

function ScatterChart(props) {
  const { data, threshold } = props;
  const { keys, items } = data;

  const options = customizeOptions;
  const optionsMargin = options.margin;
  const optionsXAxis = options.xAxis;
  const optionsYAxis = options.yAxis;

  useEffect(() => {
    if (data) {
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

  const renderItems = useMemo(() => {
    return <Scatter data={chartData} fill={generateRandomHexColor()} />;
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChartComponent data={chartData} margin={optionsMargin}>
        <CartesianGrid />
        {!optionsXAxis.enabled || (
          <XAxis
            dataKey={keys.xAxis}
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => {
              let formatted = value;

              if (!isNaN(value)) {
                formatted = value.toLocaleString("en-US");
              }

              if (moment(formatted).isValid()) {
                formatted = moment(value).format("MMM DD, YY");
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
            dataKey={keys.yAxis}
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => {
              let formatted = value;

              if (!isNaN(value)) {
                formatted = value.toLocaleString("en-US");
              }

              if (moment(formatted).isValid()) {
                formatted = moment(value).format("MMM DD, YY");
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

        <ZAxis
          dataKey={keys.zAxis}
          style={{ fontSize: "12px" }}
          tickFormatter={(value) => {
            let formatted = value;

            if (!isNaN(value)) {
              formatted = value.toLocaleString("en-US");
            }

            if (moment(formatted).isValid()) {
              formatted = moment(value).format("MMM DD, YY");
            }

            return formatted;
          }}
        ></ZAxis>

        <Tooltip
          formatter={(value) => {
            let formatted = value;

            if (!isNaN(value)) {
              formatted = value.toLocaleString("en-US");
            }

            if (moment(formatted).isValid()) {
              formatted = moment(value).format("MMM DD, YY");
            }

            return formatted;
          }}
        />

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
        {renderItems}
      </ScatterChartComponent>
    </ResponsiveContainer>
  );
}

export default memo(ScatterChart);