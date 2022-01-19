import React, { lazy, memo, Suspense } from "react";

function ChartRender(props) {
  const { type, data } = props;

  const ChartType = lazy(() =>  import(`../chartTypes/${type}`));
  return (
    !type || (
      <Suspense fallback={null}>
        <ChartType data={data} />
      </Suspense>
    )
  );
}

export default memo(ChartRender);
