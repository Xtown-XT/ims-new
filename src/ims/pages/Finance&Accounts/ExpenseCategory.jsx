import React, { useState } from "react";
import {
  Search,
  Plus,
  AlertCircle
} from "lucide-react";
import { Modal, Select, Table, Button, Input, Form, Switch } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";

const { confirm } = Modal;
const { Option } = Select;

const ExpenseCategory = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusToggle, setStatusToggle] = useState(true);

  // Table Data
  const [data, setData] = useState([
    {
      key: "1",
      category: "Employee Benefits",
      description: "Team Lunch at Restaurant",
      status: "Active",
    },
    {
      key: "2",
      category: "Office Supplies",
      description: "Stationery items for office",
      status: "Inactive",
    },
  ]);

  // Form Input Data
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    status: "",
  });

  // Table Columns
  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            text === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button icon={<EyeOutlined />} />
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
      title: "Are you sure you want to delete this category?",
      icon: <AlertCircle color="#ff4d4f" />,
      content: `Category: ${record.category}`,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk() {
        setData((prev) => prev.filter((item) => item.key !== record.key));
      },
    });
  };

  // Form Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = () => {
    const newItem = {
      key: Date.now(),
      ...formData,
      status: statusToggle ? "Active" : "Inactive",
    };
    setData([...data, newItem]);
    setShowForm(false);
    setFormData({ category: "", description: "", status: "" });
    setStatusToggle(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Expense Category</h2>
          <p className="text-sm text-gray-500">Manage your Expense Categories</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1.5 rounded-lg hover:bg-violet-600 transition text-sm"
            onClick={() => setShowForm(true)}
          >
            <Plus size={14} /> Add Expense Category
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white shadow-md py-4 rounded-lg">
        <div className="flex justify-between items-center mb-4 px-4 gap-3 flex-wrap">
          <div className="relative w-48">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Form.Item className="!mb-0">
              <Select
                placeholder="Status"
                style={{ width: 150 }}
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
                allowClear
              >
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="bg-white"
          bordered={false}
          rowClassName={() => "hover:bg-gray-50"}
          style={{ border: "1px solid #e5e7eb" }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  className="bg-gray-100 text-gray-600 font-bold text-sm px-6 py-3"
                />
              ),
            },
            body: {
              cell: (props) => <td {...props} className="px-6 py-3" />,
              row: (props) => (
                <tr
                  {...props}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                />
              ),
            },
          }}
        />
      </div>

      {/* Add Category Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Expense Category
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
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  style={{ minHeight: 40 }}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-1 block">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  style={{ minHeight: 100 }}
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="text-sm text-gray-700">Status</label>
                <Switch
                  checked={statusToggle}
                  onChange={(checked) => setStatusToggle(checked)}
                  className="!bg-green-500"
                />
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
                onClick={handleAddCategory}
                className="px-5 py-2 rounded-md bg-[#fca120] text-white hover:opacity-95 transition"
              >
                Add Expense Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCategory;
