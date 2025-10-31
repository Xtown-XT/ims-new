import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AuditOutlined,
  DesktopOutlined,
  ClusterOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

// Existing pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SalesDashboard from "./pages/dashboard/SalesDashboard";

// ✅ Correct import for Super Admin
import Dashboard from "./pages/superadmin/Dashboard";

// ==================== SIDEBAR MENU ITEMS ====================
export const dashboardMenuItems = [
  {
    icon: <AuditOutlined />,
    key: "/dashboard",
    label: "IMS Dashboard",
    children: [
      {
        icon: <DesktopOutlined />,
        key: "/dashboard/admin",
        label: "Admin Dashboard",
      },
      {
        icon: <ClusterOutlined />,
        key: "/dashboard/sales",
        label: "Sales Dashboard",
      },
    ],
  },
  {
    icon: <UserOutlined />,
    key: "/dashboard/superadmin", // ✅ keep consistent under /dashboard
    label: "Super Admin",
    children: [
      {
        icon: <DashboardOutlined />,
        key: "/dashboard/superadmin/dashboard", // ✅ correct full key path
        label: "Dashboard",
      },
    ],
  },
];

// ==================== ROUTE CONFIGURATION ====================
const DashboardRoutes = () => {
  return (
    <Routes>
      {/* IMS Dashboards */}
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="sales" element={<SalesDashboard />} />

      {/* ✅ Super Admin Dashboard Route (make it relative) */}
      <Route path="superadmin/dashboard" element={<Dashboard />} />

      {/* Default Route */}
      <Route
        index
        element={
          <div style={{ padding: 20 }}>
            <h2>IMS Dashboard</h2>
            <p>Select a sub-dashboard (Admin, Sales, or Super Admin) from the sidebar.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default DashboardRoutes;
