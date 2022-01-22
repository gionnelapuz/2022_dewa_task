import AdminLayout from "../../components/layouts/AdminLayout";

import CreateChart from "../../components/pages/Admin/Charts/CreateChart";
import Dashboard from "../../components/pages/Admin/Dashboard";
import Login from "../../components/pages/Login";

import ChartProvider from "../../services/contexts/chartProvider";

export const routes = {
  login: {
    path: "/login",
    element: <Login />,
  },
  dashboard: {
    path: "/",
    element: (
      <ChartProvider>
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </ChartProvider>
    ),
  },
  chartCreate: {
    path: "/chart/create",
    element: (
      <ChartProvider>
        <CreateChart />
      </ChartProvider>
    ),
  }
};
