import { Routes, Route } from "react-router-dom";
import { FileDoneOutlined } from "@ant-design/icons";
import Products from "./pages/inventory/products";


export const imsMenuItems = [
  {
    icon: <FileDoneOutlined />,
    key: "/ims/inventory",
    label: "Inventory",
    children: [
      {
        key: "/ims/inventory/products",
        label: "Products",
        icon: <FileDoneOutlined />,
      },
    ],
  },
];

const IMSRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<div>IMS Dashboard</div>} />
      <Route path="inventory/products" element={<Products />} />
    </Routes>
  );
};

export default IMSRoutes;
