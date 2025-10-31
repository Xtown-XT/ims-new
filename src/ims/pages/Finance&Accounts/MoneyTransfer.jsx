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

const MoneyTransfer = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterSelectStore, setFilterSelectStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const [formData, setFormData] = useState([
    {
      date: "24 Dec 2024",
      referencenumber: "#MT842",
      fromaccount: "3298784309485",
      toaccount: "4598489498498",
      amount: "$200",
    },
    {
      date: "10 Dec 2024",
      referencenumber: "#MT821",
      fromaccount: "5475878970090",
      toaccount: "4494048448994",
      amount: "$50",
    },
  ]);

  const [newTransfer, setNewTransfer] = useState({
    fromaccount: "",
    toaccount: "",
    amount: "",
  });

  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Reference Number",
      dataIndex: "referencenumber",
      key: "referencenumber",
    },
    { title: "From Account", dataIndex: "fromaccount", key: "fromaccount" },
    { title: "To Account", dataIndex: "toaccount", key: "toaccount" },
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

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this record?",
      icon: <AlertCircle color="#ff4d4f" />,
      content: `Reference: ${record.referencenumber}`,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk() {
        setFormData(
          formData.filter(
            (item) => item.referencenumber !== record.referencenumber
          )
        );
      },
    });
  };

  const handleAddTransfer = () => {
    setFormData([
      ...formData,
      {
        date: dayjs().format("DD MMM YYYY"),
        referencenumber: `#MT${Math.floor(Math.random() * 1000)}`,
        ...newTransfer,
      },
    ]);
    setNewTransfer({
      fromaccount: "",
      toaccount: "",
      amount: "",
    });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Money Transfer
          </h2>
          <p className="text-sm text-gray-500">
            Manage your money transfers
          </p>
        </div>
        <button
          className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1.5 rounded-lg hover:bg-violet-600 transition text-sm"
          onClick={() => setShowForm(true)}
        >
          <Plus size={14} /> Add Money Transfer
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md py-4 rounded-lg">
        <div className="flex justify-between items-center mb-4 px-6 flex-wrap gap-3">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ width: 220 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Money Transfer
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:opacity-90"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* From Account */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  From Account <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Select"
                  style={{ width: "100%" }}
                  value={newTransfer.fromaccount}
                  onChange={(val) =>
                    setNewTransfer({ ...newTransfer, fromaccount: val })
                  }
                >
                  <Option value="3298784309485">3298784309485</Option>
                  <Option value="5475878970090">5475878970090</Option>
                </Select>
              </div>

              {/* To Account */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  To Account <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Select"
                  style={{ width: "100%" }}
                  value={newTransfer.toaccount}
                  onChange={(val) =>
                    setNewTransfer({ ...newTransfer, toaccount: val })
                  }
                >
                  <Option value="4598489498498">4598489498498</Option>
                  <Option value="4494048448994">4494048448994</Option>
                </Select>
              </div>

              {/* Amount */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Amount <span className="text-red-500">*</span>
                </label>
                <Input
                  prefix="$"
                  placeholder="Enter Amount"
                  value={newTransfer.amount}
                  onChange={(e) =>
                    setNewTransfer({ ...newTransfer, amount: e.target.value })
                  }
                  className="py-2 text-base rounded-md"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-1.5 rounded-md bg-[#0b365a] text-white text-sm hover:opacity-95 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransfer}
                className="px-4 py-1.5 rounded-md bg-[#fca120] text-white text-sm hover:opacity-95 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyTransfer;
