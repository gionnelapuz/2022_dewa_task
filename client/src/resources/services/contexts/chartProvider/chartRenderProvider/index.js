import React, { useContext, useState } from "react";

const GraphRenderContext = React.createContext();

export function useChartRender() {
  return useContext(GraphRenderContext);
}

function ChartRenderProvider({ children }) {
  const [chartType, setChartType] = useState(null);
  const [chartData, setChartData] = useState({
    keys: {},
    items: []
  });
  const [threshold, setThreshold] = useState('');

  const resetChartData = () => setChartData({
    keys: {},
    items: []
  })

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
      value={[chartType, setChartType, chartData, setChartData, resetChartFields, threshold, setThreshold, resetChartData]}
    >
      {children}
    </GraphRenderContext.Provider>
  );
}

export default ChartRenderProvider;
