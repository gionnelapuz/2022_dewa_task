import React, { useContext, useState } from "react";
import SourceChartData from "../../../../../components/pages/admin/charts/sourceChartData";
import PreviewChartData from "../../../../../components/pages/admin/charts/previewChartData";
import GenerateChart from "../../../../../components/pages/admin/charts/generateChart";

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

  const resetSteps = () => setStep(1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SourceChartData />;
      case 2:
        return <PreviewChartData />;
      case 3:
        return <GenerateChart />;
      default:
        break;
    }
  };

  return (
    <StepsContext.Provider
      value={[step, moveBackward, moveForward, renderStep, resetSteps]}
    >
      {children}
    </StepsContext.Provider>
  );
}

export default StepProvider;
