import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/layouts/adminLayout";

import Login from "./components/pages/login";

import PrivateRoute from "./resources/services/routes/privateRoute";
import Dashboard from "./components/pages/admin/dashboard";
import CreateGraph from "./components/pages/admin/graphs/createGraph";

import CreateGraphProvider from "./resources/services/contexts/createGraphProvider";

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
          path="/graph/create"
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
}

export default App;
