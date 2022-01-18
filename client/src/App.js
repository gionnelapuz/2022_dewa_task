import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/layouts/adminLayout";

import Login from "./components/pages/login";

import PrivateRoute from "./resources/services/routes/privateRoute";
import Dashboard from "./components/pages/admin/dashboard";
import CreateGraph from "./components/pages/admin/graphs/createGraph";

import CreateGraphProvider from "./resources/services/contexts/createGraphProvider";

import ChartRender from "./components/includes/charts/chartRender";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <CreateGraphProvider>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </CreateGraphProvider>
            </PrivateRoute>
          }
        />

        <Route
          path="/chart/create"
          element={
            <PrivateRoute>
              <CreateGraphProvider>
                <CreateGraph />
              </CreateGraphProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );

  // return <ChartRender type={"lineChart"} />;
}

export default App;
