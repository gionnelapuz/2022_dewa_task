import React, { useContext, useState } from "react";

const StepsContext = React.createContext();

export function useSteps() {
  return useContext(StepsContext);
}

function StepProvider({ children }) {
  const [step, setStep] = useState("Source");

  const moveStep = (data) => {
    return setStep(data);
  };

  const resetStep = () =>
    setStep("Source");

  return (
    <StepsContext.Provider value={{ step, moveStep, resetStep }}>
      {children}
    </StepsContext.Provider>
  );
}

export default StepProvider;
