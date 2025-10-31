import { Routes, Route } from "react-router-dom";
import { FileDoneOutlined, AppstoreOutlined, SwapOutlined, SlidersOutlined } from "@ant-design/icons";

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
