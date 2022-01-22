import React, { lazy, Suspense, useEffect } from "react";
import { useSteps } from "../../../../../services/contexts/chartProvider/stepsProvider";

import styles from "./createChart.module.scss";

function CreateChart() {
  const { step } = useSteps();

  const CreateChartStep = lazy(() =>
    import(`../../../../includes/Charts/CreateChart/${step}Step`)
  );

  return (
    <Suspense fallback={null}>
      <div className={styles.wrapper}>
        <CreateChartStep />
      </div>
    </Suspense>
  );
}

export default CreateChart;
