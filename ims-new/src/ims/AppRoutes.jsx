import { Routes, Route } from "react-router-dom";
import {
  FileDoneOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  RollbackOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Products from "./pages/inventory/products";

// ✅ Purchase-related pages
import Purchases from "./pages/purchases/Purchases";
import PurchaseOrder from "./pages/purchases/PurchaseOrder";
import PurchaseReturn from "./pages/purchases/PurchaseReturn";

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
  {
    icon: <ShoppingCartOutlined />,
    key: "/ims/purchases",
    label: "Purchases",
    // 👇 Dropdown with icons for each item
    children: [
      {
        key: "/ims/purchases/list",
        label: "Purchases",
        icon: <ShoppingOutlined />, // 🛍️ basket-like icon
      },
      {
        key: "/ims/purchases/order",
        label: "Purchase Order",
        icon: <FileTextOutlined />, // 📄 document-like icon
      },
      {
        key: "/ims/purchases/return",
        label: "Purchase Return",
        icon: <RollbackOutlined />, // ↩️ return arrow icon
      },
    ],
  },
];

const IMSRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="dashboard" element={<div>IMS Dashboard</div>} />

      {/* Inventory */}
      <Route path="inventory/products" element={<Products />} />

      {/* Purchases */}
      <Route path="purchases/list" element={<Purchases />} />
      <Route path="purchases/order" element={<PurchaseOrder />} />
      <Route path="purchases/return" element={<PurchaseReturn />} />
    </Routes>
  );
};

export default IMSRoutes;
