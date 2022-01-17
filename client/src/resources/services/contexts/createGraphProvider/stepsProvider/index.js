import React, { useContext, useState } from "react";
import GenerateGraph from "../../../../../components/pages/admin/graphs/generateGraph";
import PreviewGraphData from "../../../../../components/pages/admin/graphs/previewGraphData";
import SourceGraphData from "../../../../../components/pages/admin/graphs/sourceGraphData";

const StepsContext = React.createContext();

export function useSteps() {
  return useContext(StepsContext);
}

function StepProvider({ children }) {
  const [step, setStep] = useState(1);

  const moveBackward = () => {
    return setStep((prev) => prev - 1);
  };

  const moveForward = () => {
    return setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SourceGraphData />;
      case 2:
        return <PreviewGraphData />;
      case 3:
        return <GenerateGraph />;
      default:
        break;
    }
  };

  return (
    <StepsContext.Provider
      value={[step, moveBackward, moveForward, renderStep]}
    >
      {children}
    </StepsContext.Provider>
  );
}

export default StepProvider;
