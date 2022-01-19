import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "./resources/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routes).map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
