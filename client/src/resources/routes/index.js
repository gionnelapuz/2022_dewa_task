import AdminLayout from "../../components/layouts/adminLayout";

import CreateChart from "../../components/pages/admin/charts/createChart";
import Dashboard from "../../components/pages/admin/dashboard";
import Login from "../../components/pages/login";

import ChartProvider from "../../resources/services/contexts/chartProvider";

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
