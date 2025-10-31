import { Routes, Route } from "react-router-dom";
import { FileDoneOutlined, AppstoreOutlined, SwapOutlined, SlidersOutlined,ShopOutlined,ShoppingCartOutlined,FileTextOutlined,FileOutlined,FormOutlined   } from "@ant-design/icons";

// Inventory Pages
import Products from "./pages/inventory/products";

// Finance & Accounts Pages
import Expenses from "./pages/Finance&Accounts/Expenses";
import ExpenseCategory from "./pages/Finance&Accounts/ExpenseCategory";
import Income from "./pages/Finance&Accounts/Income";
import IncomeCategory from "./pages/Finance&Accounts/IncomeCategory";
import BankAccounts from "./pages/Finance&Accounts/BankAccounts";
import MoneyTransfer from "./pages/Finance&Accounts/MoneyTransfer";
import BalanceSheet from "./pages/Finance&Accounts/BalanceSheet";
import CashFlow from "./pages/Finance&Accounts/CashFlow";
import AccountStatement from "./pages/Finance&Accounts/AccountStatement";

// Stock Pages
import ManageStock from "./pages/stock/ManageStock";
import StockAdjustment from "./pages/stock/StockAdjustment";
import StockTransfer from "./pages/stock/StockTransfer";


import OnlineOrder from "./pages/Sales/sales/OnlineOrder";
import POSOrders from "./pages/Sales/sales/POSOrders";
import POS from "./pages/Sales/POS/POS";
import Invoices from "./pages/Sales/invoices";
import Quotation from "./pages/Sales/Quotation";
import Dashboard from "./pages/Dashboard";


export const imsMenuItems = [
  // Inventory
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

  // Stock
  {
    icon: <AppstoreOutlined />,
    key: "/ims/stock",
    label: "Stock",
    children: [
      {
        key: "/ims/stock/manage",
        label: "Manage Stock",
        icon: <AppstoreOutlined />,
      },
      {
        key: "/ims/stock/adjustment",
        label: "Stock Adjustment",
        icon: <SlidersOutlined />,
      },
      {
        key: "/ims/stock/transfer",
        label: "Stock Transfer",
        icon: <SwapOutlined />,
      },
    ],
  },

  // Finance & Accounts
  {
    icon: <FileDoneOutlined />,
    key: "/ims/FinanceAccounts",
    label: "Finance & Accounts",
    children: [
      {
        key: "/ims/FinanceAccounts/Expenses",
        label: "Expenses",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/ExpenseCategory",
        label: "Expense Category",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/Income",
        label: "Income",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/IncomeCategory",
        label: "Income Category",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/BankAccounts",
        label: "Bank Accounts",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/MoneyTransfer",
        label: "Money Transfer",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/BalanceSheet",
        label: "Balance Sheet",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/CashFlow",
        label: "Cash Flow",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/ims/FinanceAccounts/AccountStatement",
        label: "Account Statement",
        icon: <FileDoneOutlined />,
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

      {/* Stock */}
      <Route path="stock/manage" element={<ManageStock />} />
      <Route path="stock/adjustment" element={<StockAdjustment />} />
      <Route path="stock/transfer" element={<StockTransfer />} />


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
      {/* Finance & Accounts */}
      <Route path="FinanceAccounts/Expenses" element={<Expenses />} />
      <Route
        path="FinanceAccounts/ExpenseCategory"
        element={<ExpenseCategory />}
      />
      <Route path="FinanceAccounts/Income" element={<Income />} />
      <Route
        path="FinanceAccounts/IncomeCategory"
        element={<IncomeCategory />}
      />
      <Route path="FinanceAccounts/BankAccounts" element={<BankAccounts />} />
      <Route path="FinanceAccounts/MoneyTransfer" element={<MoneyTransfer />} />
      <Route path="FinanceAccounts/BalanceSheet" element={<BalanceSheet />} />
      <Route path="FinanceAccounts/CashFlow" element={<CashFlow />} />
      <Route
        path="FinanceAccounts/AccountStatement"
        element={<AccountStatement />}
      />
    </Routes>
  );
};

export default IMSRoutes;
