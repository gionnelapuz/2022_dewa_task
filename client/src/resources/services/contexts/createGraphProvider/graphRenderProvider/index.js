import React, { useContext, useState } from "react";

const GraphRenderContext = React.createContext();

export function useGraphRender() {
  return useContext(GraphRenderContext);
}

function GraphRenderProvider({ children }) {
  const [chartType, setChartType] = useState(null);
  const [chartData, setChartData] = useState({
    keys: {},
    items: []
  });
  const [threshold, setThreshold] = useState('');

  const resetChartFields = () => {
    setChartType(null)
    setChartData({
      keys: {},
      items: [],
    })
    setThreshold('')
  }
  
  return (
    <GraphRenderContext.Provider
      value={[chartType, setChartType, chartData, setChartData, resetChartFields, threshold, setThreshold]}
    >
      {children}
    </GraphRenderContext.Provider>
  );
}

export default GraphRenderProvider;
