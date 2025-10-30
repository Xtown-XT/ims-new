import { Routes, Route } from "react-router-dom";
import { 
  FileDoneOutlined, 
  ShoppingCartOutlined, 
  FileTextOutlined, 
  ShopOutlined, 
  FileOutlined, 
  FormOutlined 
} from "@ant-design/icons";

// Import Components
import Products from "./pages/inventory/products";
import OnlineOrder from "./pages/Sales/sales/OnlineOrder";
import POSOrders from "./pages/Sales/sales/POSOrders";
import POS from "./pages/Sales/POS/POS";
import Invoices from "./pages/Sales/invoices";
import Quotation from "./pages/Sales/Quotation";
import Dashboard from "./pages/Dashboard";

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
  // POS
  {
    icon: <ShopOutlined />,
    key: "/ims/sales/pos",
    label: "POS",
  },
  // Sales Orders
  {
    icon: <ShoppingCartOutlined />,
    key: "/ims/sales",
    label: "Sales",
    children: [
      { 
        key: "/ims/sales/online-orders",
        label: "Online Orders",
        icon: <FileTextOutlined />,
      },
      { 
        key: "/ims/sales/pos-orders",
        label: "POS Orders",
        icon: <FileTextOutlined />,
      },
    ]
  },
  // Invoice
  {
    icon: <FileOutlined />,
    key: "/ims/invoice",
    label: "Invoice",
  },
  // Quotation
  {
    icon: <FormOutlined />,
    key: "/ims/quotation",
    label: "Quotation",
  },
];

const IMSRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="dashboard" element={<Dashboard />} />
      
      {/* Inventory Routes */}
      <Route path="inventory/products" element={<Products />} />
      
      {/* POS Route */}
      <Route path="sales/pos" element={<POS />} />
      
      {/* Sales Orders Routes */}
      <Route path="sales/online-orders" element={<OnlineOrder />} />
      <Route path="sales/pos-orders" element={<POSOrders />} />
      
      {/* Invoice Route */}
      <Route path="invoice" element={<Invoices />} />
      
      {/* Quotation Route */}
      <Route path="quotation" element={<Quotation />} />
    </Routes>
  );
};

export default IMSRoutes;