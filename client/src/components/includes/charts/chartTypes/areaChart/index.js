import React, { memo, useEffect, useMemo, useState } from "react";

import moment from "moment";

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

export const variables = [
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
  values: {},
};

function AreaChart(props) {
  const { data, threshold } = props;
  const { keys, items } = data;

  const optionsMargin = options.margin;
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

  const renderArea = useMemo(() => {
    return Object.keys(keys).map((key, i) => {
      const dataKey = keys[key];
      return (
        <Area
          key={i}
          name={dataKey}
          stackId={1}
          type="monotone"
          dataKey={dataKey}
          fill={generateRandomHexColor()}
        />
      );
    });
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChartComponent data={chartData} margin={optionsMargin}>
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

        {/* {threshold.length > 0 ? (
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
        ) : null} */}

        {renderArea}
      </AreaChartComponent>
    </ResponsiveContainer>
  );
}

export default memo(AreaChart);
