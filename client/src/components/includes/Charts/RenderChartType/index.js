import React, { lazy, memo, Suspense } from "react";

function RenderChartType(props) {
  const { type, data } = props;

  const ChartType = lazy(() =>  import(`./${type}`));
  return (
    !type || (
      <Suspense fallback={null}>
        <ChartType data={data} />
      </Suspense>
    )
  );
}

export default memo(RenderChartType);
