import React, { memo, useEffect, useMemo, useState } from "react";

import moment from "moment";

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
  ReferenceLine,
  Label,
} from "recharts";
import { generateRandomHexColor } from "../../../../../utils/charts/chartHelpers";

export const variables = [
  {
    key: "xAxis",
    label: "x-axis",
    required: true,
  },
  {
    key: "yAxis",
    label: "y-axis",
    required: true,
  },
  {
    key: "zAxis",
    label: "z-axis",
    required: true,
  }
];

export const options = {
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

const LineChart = (props) => {
  const { data, threshold } = props;
  const { keys, items } = data;

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

  // const renderReferenceLine = useMemo(() => {
  //   return threshold.length > 0 ? (
  //     <ReferenceLine
  //       label={"threshold"}
  //       y={parseInt(threshold)}
  //       stroke={"#076b2e"}
  //       alwaysShow
  //       style={{ fontSize: "10px" }}
  //     >
  //       <Label
  //         value={parseInt(threshold)}
  //         position="left"
  //         style={{ fontSize: "12px" }}
  //       />
  //     </ReferenceLine>
  //   ) : null
  // }, [threshold])

  const renderItems = useMemo(() => {
    return Object.keys(keys).map((key, i) => {
      const dataKey = keys[key];
      return (
        <Line
          key={i}
          name={dataKey}
          type="monotone"
          dataKey={dataKey}
          stroke="url(#gradient)"
          dot={{ stroke: '#076b2e', strokeWidth: 1, r: 3}}
        />
      );
    });
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartComponent data={chartData} margin={optionsMargin}>
        <CartesianGrid />

        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor={generateRandomHexColor()} />
          </linearGradient>
        </defs>

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
              formatted = moment(value).format("MMM DD, YYYY");
            }

            return formatted;
          }}
        />

        {/* {renderReferenceLine} */}

        {renderItems}
      </LineChartComponent>
    </ResponsiveContainer>
  );
};

export default memo(LineChart);
