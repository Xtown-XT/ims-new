import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Modal, Select,Table, Button, Input  } from 'antd';
const { confirm } = Modal;
const { Option } = Select;
import { Form } from "antd";
import { EyeOutlined, EditOutlined,DeleteOutlined, SearchOutlined   } from "@ant-design/icons";

const Expenses = () => {
  const [showForm, setShowForm] = useState(false);

  const [filterCategory, setFilterCategory] =useState(null)
  const [ filterBrand ,setFilterBrand] = useState(null)
  const [searchText, setSearchText ] = useState(null)
  const [filteStatus , setFilterStatus] = useState(null)

  const [status, setStatus] = useState(true)

  const [formData, setFormData] = useState([
    {
      reference: "EX849",
      expensename: "Team Lunch",
      category: "Employee Benefits	",
      description: "Team Lunch at Restaurant	",
      date: "24 Dec 2024",
      amount: "$200",
      status:"Approved"
      // status: status ? "Approved" : "Pending",
    },
    {
      reference: "EX848",
      expensename: "Stationery Purchase",
      category: "Office Supplies",
      description: "Stationery items for office",
      date: "10 Dec 2024",
      amount: "$50",
      status:"Pending"
      // status: status ? "Approved" : "Pending",
    },
  ]);

  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Expense Name", dataIndex: "expensename", key: "expensename" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status" ,
      render: (status) => (
        <span style={{backgroundColor: status === "Approved" ? "lightgreen" : "skyblue"}}>{status}</span>
      )
    },
    {
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure you want to delete this expense?',
      icon: <AlertCircle color="#ff4d4f" />,
      content: `Expense: ${record.expenseName}`,
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      onOk() {
        console.log('Deleting expense:', record);
      },
      onCancel() {
        console.log('Deletion cancelled');
      },
    });
  };

  const getStatusColor = (status) =>
    status === "Approved"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    console.log("Form submitted", formData);
    setShowForm(false);
    setFormData({
      expense: "",
      description: "",
      category: "",
      date: "",
      amount: "",
      status: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Expenses</h2>
          <p className="text-sm text-gray-500">Manage your Expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1.5 rounded-lg hover:bg-violet-600 transition text-sm"
            onClick={() => setShowForm(true)}
          >
            <Plus size={14} /> Add Expense
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md py-4 rounded-lg">
        {/* Search + Filters */}
        <div className="flex justify-between items-center mb-4 px-4 gap-3 flex-wrap">
          <div className="relative w-48">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />

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
                placeholder="Category"
                style={{ width: 150 }}
                value={filterCategory}
                onChange={(val) => setFilterCategory(val)}
                allowClear
              >
                <Option value="category" disabled>Category</Option>
                <Option value="Utilities">Utilities</Option>
                <Option value="Office Supplies">Office Supplies</Option>
              </Select>
            </Form.Item>
            <Form.Item className="!mb-0">
              <Select
                placeholder="Status"
                style={{ width: 150 }}
                value={filteStatus}
                onChange={(val) => setFilterStatus(val)}
                allowClear
              >
                <Option value="status" disabled>Status</Option>
                <Option value="Lenova">Approved</Option>
                <Option value="Beats">Pending</Option>
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
              cell: (props) => <th {...props} className="bg-gray-100 text-gray-600 font-bold text-sm px-6 py-3" />,
            },
            body: {
              cell: (props) => <td {...props} className="px-6 py-3" />,
              row: (props) => <tr {...props} className="border-t border-gray-100 hover:bg-gray-50 transition" />,
            },
          }}
        />

        {/* Add Expense Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative shadow-xl">
              {/* Header with title and close */}
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Add Expense</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:opacity-90"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Form grid */}
              <div className="space-y-4">
                {/* Expense name */}
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Expense <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expense"
                    placeholder=""
                    value={formData.expense }
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    style={{ minHeight: 40 }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Description</label>
                  <textarea
                    name="description"
                    placeholder=""
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    style={{ minHeight: 120, resize: "vertical" }}
                  />
                </div>

                {/* Two-column row: Category / Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Office Supplies">Office Supplies</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Two-column row: Amount / Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="amount"
                      placeholder=""
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-md bg-[#0b365a] text-white hover:opacity-95 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="px-5 py-2 rounded-md bg-gradient-to-r from-orange-400 to-yellow-300 text-white hover:opacity-95 transition"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
