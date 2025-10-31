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

//purchase
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

  //purchase
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

      {/* Purchases */}
      <Route path="purchases/list" element={<Purchases />} />
      <Route path="purchases/order" element={<PurchaseOrder />} />
      <Route path="purchases/return" element={<PurchaseReturn />} />
    
    </Routes>
  );
};

export default IMSRoutes;