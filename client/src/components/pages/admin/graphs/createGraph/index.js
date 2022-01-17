import React, { useEffect, useState } from "react";
import { useSteps } from "../../../../../resources/services/contexts/createGraphProvider/stepsProvider";

import "./createGraph.scss";

function CreateGraph() {
  const [step, moveForward, moveBackward, renderStep] = useSteps();

  return <div className="createGraph">{renderStep()}</div>;
}

export default CreateGraph;
