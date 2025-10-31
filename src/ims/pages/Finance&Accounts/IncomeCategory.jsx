import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  AlignJustify
} from "lucide-react";
import { Modal, Select, Table, Button, Input } from "antd";
const { confirm } = Modal;
const { Option } = Select;

import { Form } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const IncomeCategory = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterBrand, setFilterBrand] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);

  const [formData, setFormData] = useState([
    {
      code: "INCA849",
      category: "Foreign investment",
      AddedDate: "24 Dec 2025",
    },
    {
      code: "INCA48",
      category: "Product Export",
      AddedDate: "29 Dec 2025",
    },
  ]);

  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    { title: "Code", dataIndex: "code", key: "code", align: "center" },
    { title: "Category", dataIndex: "category", key: "category", align: "center" },
    {
      title: "Added Date",
      dataIndex: "AddedDate",
      key: "AddedDate",
      align: "center",
    },
    {
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this category?",
      icon: <AlertCircle color="#ff4d4f" />,
      content: `Category: ${record.category}`,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk() {
        console.log("Deleting:", record);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = () => {
    console.log("Form submitted", formData);
    setShowForm(false);
    setFormData({
      code: "",
      category: "",
      AddedDate: "",
    });
  };

  const handleGenerateCode = () => {
    const randomCode = "INCA" + Math.floor(Math.random() * 1000 + 100);
    setFormData({ ...formData, code: randomCode });
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Income Category
          </h2>
          <p className="text-sm text-gray-500">Manage your Income Categories</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1.5 rounded-lg hover:bg-violet-600 transition text-sm"
            onClick={() => setShowForm(true)}
          >
            <Plus size={14} /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md py-4 rounded-lg">
        {/* Search + Filters */}
        <div className="flex justify-between items-center mb-4 px-4 gap-3 flex-wrap">
          <div className="relative w-48">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-center justify-center flex-row">
            <Form.Item className="!mb-0">
              <Select
                placeholder="Category"
                style={{ width: 150 }}
                value={filterCategory}
                onChange={(val) => setFilterCategory(val)}
                allowClear
              >
                <Option value="Foreign investment">Foreign investment</Option>
                <Option value="Product Export">Product Export</Option>
              </Select>
            </Form.Item>

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

            <Form.Item className="!mb-0">
              <Select
                placeholder="Sort By: Last 7 Days"
                style={{ width: 180 }}
                allowClear
              >
                <Option value="Recently Added">Recently Added</Option>
                <Option value="Ascending">Ascending</Option>
                <Option value="Descending">Descending</Option>
                <Option value="Last Month">Last Month</Option>
                <Option value="Last 7 Days">Last 7 Days</Option>
              </Select>
            </Form.Item>
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

        {/* Add Income Category Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add Income Category
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
                {/* Code */}
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="code"
                      value={formData.code || ""}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      onClick={handleGenerateCode}
                      className="px-3 py-1 bg-[#fca120] text-white rounded-md text-sm hover:opacity-90"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                {/* Enter Name */}
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Enter Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder=""
                    value={formData.category || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    style={{ minHeight: 40 }}
                  />
                </div>
              </div>

              {/* Footer Buttons */}
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
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeCategory;
