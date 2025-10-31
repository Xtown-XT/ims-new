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

const Income = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterSelectStore, setFilterSelectStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const [formData, setFormData] = useState([
    {
      reference: "IN102",
      store: "Main Branch",
      category: "Product Sales",
      notes: "Sold electronics",
      date: "2024-10-15",
      amount: "$1200",
    },
    {
      reference: "IN101",
      store: "Online Store",
      category: "Service Income",
      notes: "Website Design Project",
      date: "2024-10-10",
      amount: "$800",
    },
  ]);

  const [newIncome, setNewIncome] = useState({
    date: "",
    category: "",
    store: "",
    amount: "",
    account: "",
    notes: "",
  });

  // Table Columns
  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Store", dataIndex: "store", key: "store" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
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

  // Delete Confirmation
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this income record?",
      icon: <AlertCircle color="#ff4d4f" />,
      content: `Reference: ${record.reference}`,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk() {
        setFormData(formData.filter((item) => item.reference !== record.reference));
      },
    });
  };

  // Add Income Handler
  const handleAddIncome = () => {
    setFormData([...formData, newIncome]);
    setNewIncome({
      date: "",
      category: "",
      store: "",
      amount: "",
      account: "",
      notes: "",
    });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Income</h2>
          <p className="text-sm text-gray-500">Manage your Income</p>
        </div>
        <button
          className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1.5 rounded-lg hover:bg-violet-600 transition text-sm"
          onClick={() => setShowForm(true)}
        >
          <Plus size={14} /> Add Income
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
            <DatePicker
              placeholder="Select Date"
              format="YYYY-MM-DD"
              style={{ width: 150 }}
              value={filterDate ? dayjs(filterDate) : null}
              onChange={(date, dateString) => setFilterDate(dateString)}
            />

            <Select
              placeholder="Select Store"
              style={{ width: 180 }}
              value={filterSelectStore}
              onChange={(val) => setFilterSelectStore(val)}
              allowClear
            >
              <Option value="Main Branch">Main Branch</Option>
              <Option value="Online Store">Online Store</Option>
              <Option value="Distribution Center">Distribution Center</Option>
              <Option value="Warehouse">Warehouse</Option>
            </Select>
          </div>
        </div>

        {/* Table */}
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

      {/* Add Income Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Income
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
              {/* Date */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select Date"
                  format="DD MMM YYYY"
                  value={newIncome.date ? dayjs(newIncome.date) : null}
                  onChange={(date, dateString) =>
                    setNewIncome({ ...newIncome, date: dateString })
                  }
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Select"
                  style={{ width: "100%" }}
                  value={newIncome.category}
                  onChange={(value) =>
                    setNewIncome({ ...newIncome, category: value })
                  }
                >
                  <Option value="Product Sales">Product Sales</Option>
                  <Option value="Service Income">Service Income</Option>
                  <Option value="Commission">Commission</Option>
                </Select>
              </div>

              {/* Store */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Store <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Select"
                  style={{ width: "100%" }}
                  value={newIncome.store}
                  onChange={(value) =>
                    setNewIncome({ ...newIncome, store: value })
                  }
                >
                  <Option value="Main Branch">Main Branch</Option>
                  <Option value="Online Store">Online Store</Option>
                  <Option value="Warehouse">Warehouse</Option>
                </Select>
              </div>

              {/* Amount + Account */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="$200"
                    value={newIncome.amount}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, amount: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Account <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Select"
                    style={{ width: "100%" }}
                    value={newIncome.account}
                    onChange={(value) =>
                      setNewIncome({ ...newIncome, account: value })
                    }
                  >
                    <Option value="Cash">Cash</Option>
                    <Option value="Bank">Bank</Option>
                    <Option value="Online Payment">Online Payment</Option>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Description
                </label>
                <div className="border border-gray-300 rounded-md">
                  <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 text-gray-500 text-sm">
                    <span className="font-medium">Normal</span>
                    <div className="flex gap-2 ml-3">
                      <button className="hover:text-gray-700 font-bold">B</button>
                      <button className="italic hover:text-gray-700">I</button>
                      <button className="underline hover:text-gray-700">U</button>
                      <button className="hover:text-gray-700">🔗</button>
                      <button className="hover:text-gray-700">•</button>
                      <button className="hover:text-gray-700">1.</button>
                      <button className="hover:text-gray-700">T</button>
                    </div>
                  </div>
                  <textarea
                    name="notes"
                    value={newIncome.notes}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, notes: e.target.value })
                    }
                    placeholder="Enter description..."
                    className="w-full px-3 py-2 text-sm focus:outline-none"
                    rows={3}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum 60 Words</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-md bg-[#0b365a] text-white hover:opacity-95 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIncome}
                className="px-5 py-2 rounded-md bg-[#fca120] text-white hover:opacity-95 transition"
              >
                Add Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;
