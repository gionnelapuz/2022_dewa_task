import React, { useEffect, useState } from "react";
import { useSteps } from "../../../../../resources/services/contexts/chartProvider/stepsProvider";

import "./createChart.scss";

function CreateChart() {
  const [step, moveForward, moveBackward, renderStep] = useSteps();

  return <div className="createGraph">{renderStep()}</div>;
}

export default CreateChart;
