import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import {
  Modal,
  Select,
  Table,
  Button,
  Input,
  DatePicker,
  Form
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { confirm } = Modal;
const { Option } = Select;

const CashFlow = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterSelectStore, setFilterSelectStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [filterStatus , setfilterStatus] = useState(null);

  const [formData, setFormData] = useState([
    {
      date: "03 oct 2025",
      bankaccountnumber: "SWIZ - 3354456565687		",
      description:"Cash payments for operating	",
      credit: "$1100	",
      debit: "$0.00	",
     accountbalance: "$1100	",
     totalbalance:"$5899	",
     paymentmethod:"Stripe",
    
    },
    {
      date: "06 oct 2025",
      bankaccountnumber: "NBC - 4324356677889	",
      description:"Loan received (short-term)		",
      credit: "$800",
      debit: "$0.00	",
     accountbalance: "$800	",
     totalbalance:"$6896",
     paymentmethod:"cash",
    },
  ]);

  const [newIncome, setNewIncome] = useState({
      date: "",
      bankaccountnumber: "",
      description:"",
      credit: "",
      debit: "",
     accountbalance: "",
     totalbalance:"",
     paymentmethod:"",


  });

  // ✅ Table Columns
  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" />,
      width: 100,
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Bank&Account Number", dataIndex: "bankaccountnumber", key: "Bankaccountnumber" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Credit", dataIndex: "credit", key: "credit" },
    { title: "Debit", dataIndex: "debit", key: "debit" },
    { title: "Account Balance", dataIndex: "accountbalance", key: "accountbalance" },
    { title: "Total Balance", dataIndex: "totalbalance", key: "totalbalance" },
    { title: "Payment Method", dataIndex: "paymentmethod", key: "paymentmethod" },
    
     
        
    

  ];

  // ✅ Delete Confirmation Modal
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

  // ✅ Add Income
 

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">CashFlow</h2>
          <p className="text-sm text-gray-500">View your CashFlow</p>
        </div>
       
      </div>

      {/* Filters + Table */}
      <div className="bg-white shadow-md py-4 rounded-lg">
        {/* ✅ Filters */}
        <div className="flex justify-between items-center mb-4 px-6 flex-wrap gap-3">
          {/* Left - Search Box */}
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ width: 220 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Right - Date + Store side by side */}
         
         <div className="flex gap-3">
            <Form.Item className="!mb-0">
              <Select
                placeholder="Payment Method"
                style={{ width: 150 }}
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
                allowClear
              >
                <Option value="Stripe">Stripe</Option>
                <Option value="Cash">Cash</Option>
                <Option value="Paypal">Paypal</Option>
            

              </Select>
            </Form.Item>
          </div>
        </div>

        {/* ✅ Table */}
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

      {/* ✅ Add Income Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="text-lg font-semibold mb-4">Add Income</h3>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="reference"
                placeholder="Reference*"
                value={newIncome.reference}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, reference: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />

              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select Date"
                format="YYYY-MM-DD"
                value={newIncome.date ? dayjs(newIncome.date) : null}
                onChange={(date, dateString) =>
                  setNewIncome({ ...newIncome, date: dateString })
                }
              />

              <input
                type="text"
                name="store"
                placeholder="Store*"
                value={newIncome.store}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, store: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />

              <select
                name="category"
                value={newIncome.category}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, category: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Category*</option>
                <option value="Product Sales">Product Sales</option>
                <option value="Service Income">Service Income</option>
              </select>

              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={newIncome.notes}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, notes: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />

              <input
                type="text"
                name="amount"
                placeholder="Amount*"
                value={newIncome.amount}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, amount: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIncome}
                className="px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600"
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

export default CashFlow;
