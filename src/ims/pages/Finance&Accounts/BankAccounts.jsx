import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import {
  Modal,
  Select,
  Table,
  Button,
  Input,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { confirm } = Modal;
const { Option } = Select;

const BankAccounts = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterSelectStore, setFilterSelectStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const [formData, setFormData] = useState([
    {
      accountHolderName: "Zephyr Indira",
      accountNo: "3298784309485",
      type: "Savings Account",
      openingBalance: "$200",
      notes: "Account for Business",
      status: "Active",
    },
    {
      accountHolderName: "Quillon Elysia",
      accountNo: "5475878970090",
      type: "Current Account",
      openingBalance: "$50",
      notes: "Account for Business",
      status: "Closed",
    },
  ]);

  const [newAccount, setNewAccount] = useState({
    accountHolderName: "",
    accountNo: "",
    type: "",
    openingBalance: "",
    notes: "",
    status: "",
  });

  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
      key: "accountHolderName",
    },
    { title: "Account No", dataIndex: "accountNo", key: "accountNo" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Opening Balance",
      dataIndex: "openingBalance",
      key: "openingBalance",
    },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button icon={<EditOutlined />} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          />
        </div>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this account?",
      icon: <AlertCircle color="#ff4d4f" />,
      content: `Account: ${record.accountHolderName}`,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk() {
        setFormData(formData.filter((item) => item.accountNo !== record.accountNo));
      },
    });
  };

  const handleAddAccount = () => {
    setFormData([...formData, newAccount]);
    setNewAccount({
      accountHolderName: "",
      accountNo: "",
      type: "",
      openingBalance: "",
      notes: "",
      status: "",
    });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Bank Accounts</h2>
          <p className="text-sm text-gray-500">Manage your Bank Accounts</p>
        </div>
        <button
          className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1.5 rounded-lg hover:bg-violet-600 transition text-sm"
          onClick={() => setShowForm(true)}
        >
          <Plus size={14} /> Add Account
        </button>
      </div>

      {/* Filters + Table */}
      <div className="bg-white shadow-md py-4 rounded-lg">
        <div className="flex justify-between items-center mb-4 px-6 flex-wrap gap-3">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ width: 220 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Select
              placeholder="Status"
              style={{ width: 150 }}
              value={filterSelectStore}
              onChange={(val) => setFilterSelectStore(val)}
              allowClear
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>

            <Select
              placeholder="Sort By: Latest"
              style={{ width: 180 }}
              value={filterSelectStore}
              onChange={(val) => setFilterSelectStore(val)}
              allowClear
            >
              <Option value="Latest">Latest</Option>
              <Option value="Ascending">Ascending</Option>
              <Option value="Descending">Descending</Option>
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={formData}
          pagination={{ pageSize: 5 }}
          className="bg-white"
          bordered={false}
          rowClassName={() => "hover:bg-gray-50"}
          style={{ border: "1px solid #e5e7eb" }}
        />
      </div>

      {/* Add Account Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl"
            style={{
              marginTop: "50px",
              maxHeight: "90vh", // ✅ moves form slightly down so header doesn’t overlap
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Create Account
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:opacity-90"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Account Holder Name */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAccount.accountHolderName}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      accountHolderName: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAccount.accountNo}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, accountNo: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Account Type */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Account Type <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Select"
                  style={{ width: "100%" }}
                  value={newAccount.type}
                  onChange={(val) =>
                    setNewAccount({ ...newAccount, type: val })
                  }
                >
                  <Option value="Savings Account">Savings Account</Option>
                  <Option value="Current Account">Current Account</Option>
                  <Option value="Fixed Deposit">Fixed Deposit</Option>
                </Select>
              </div>

              {/* Opening Balance */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Opening Balance <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="$200"
                  value={newAccount.openingBalance}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      openingBalance: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Description
                </label>
                <textarea
                  value={newAccount.notes}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, notes: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  style={{ minHeight: 90 }}
                />
                <p className="text-xs text-gray-500 mt-1">Maximum 60 Words</p>
              </div>

              {/* Account Status */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Account Status <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Active"
                  style={{ width: "100%" }}
                  value={newAccount.status}
                  onChange={(val) =>
                    setNewAccount({ ...newAccount, status: val })
                  }
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Closed">Closed</Option>
                </Select>
              </div>
            </div>

            {/* Footer Buttons */}
           <div className="flex justify-end gap-2 mt-6">
  <button
    onClick={() => setShowForm(false)}
    className="px-4 py-1.5 rounded-md bg-[#0b365a] text-white text-sm hover:opacity-95 transition"
  >
    Cancel
  </button>
  <button
    onClick={handleAddAccount}
    className="px-4 py-1.5 rounded-md bg-[#fca120] text-white text-sm hover:opacity-95 transition"
  >
    Add Account
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccounts;
