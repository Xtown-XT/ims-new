import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Avatar,
  Modal,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  UpOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({
    customer: null,
    status: null,
    sortBy: "Last 7 Days",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setInvoices([
        {
          key: "1",
          invoiceNo: "INV001",
          customer: "Carl Evans",
          customerImage: "https://i.pravatar.cc/150?img=12",
          dueDate: "24 Dec 2024",
          amount: 1000,
          paid: 1000,
          amountDue: 0.0,
          status: "Paid",
        },
        {
          key: "2",
          invoiceNo: "INV002",
          customer: "Minerva Rameriz",
          customerImage: "https://i.pravatar.cc/150?img=45",
          dueDate: "24 Dec 2024",
          amount: 1500,
          paid: 0.0,
          amountDue: 1500,
          status: "Unpaid",
        },
        {
          key: "3",
          invoiceNo: "INV003",
          customer: "Robert Lamon",
          customerImage: "https://i.pravatar.cc/150?img=33",
          dueDate: "24 Dec 2024",
          amount: 1500,
          paid: 0.0,
          amountDue: 1500,
          status: "Unpaid",
        },
        {
          key: "4",
          invoiceNo: "INV004",
          customer: "Patricia Lewis",
          customerImage: "https://i.pravatar.cc/150?img=20",
          dueDate: "24 Dec 2024",
          amount: 2000,
          paid: 1000,
          amountDue: 1000,
          status: "Overdue",
        },
        {
          key: "5",
          invoiceNo: "INV005",
          customer: "Mark Joslyn",
          customerImage: "https://i.pravatar.cc/150?img=13",
          dueDate: "24 Dec 2024",
          amount: 800,
          paid: 800,
          amountDue: 0.0,
          status: "Paid",
        },
        {
          key: "6",
          invoiceNo: "INV006",
          customer: "Marsha Betts",
          customerImage: "https://i.pravatar.cc/150?img=25",
          dueDate: "24 Dec 2024",
          amount: 750,
          paid: 0.0,
          amountDue: 750,
          status: "Unpaid",
        },
      ]);
      setPagination((p) => ({ ...p, total: 6 }));
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleSearch = (value) => setSearchTerm(value);
  const handleFilterChange = (filterName, value) =>
    setFilters({ ...filters, [filterName]: value });

  const handleRefresh = () => fetchInvoices();

  const handleView = (record) => {
    setSelectedInvoice(record);
    setViewModalVisible(true);
  };

  const handleDelete = (record) => {
    confirm({
      title: "Delete invoice",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete invoice ${record.invoiceNo}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setInvoices((prev) => prev.filter((inv) => inv.key !== record.key));
      },
    });
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedInvoice(null);
  };

  const getStatusTag = (status) => {
    const styles = {
      Paid: "bg-[#E8F8F0] text-[#28C76F]",
      Unpaid: "bg-[#FEE9E7] text-[#EA5455]",
      Overdue: "bg-[#FFF4E5] text-[#FF9F43]",
    };

    const style = styles[status] || styles.Paid;
    return (
      <span className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded ${style}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      width: "12%",
      render: (text) => (
        <span className="text-sm text-[#5E5873] font-normal">{text}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: "20%",
      render: (text, record) => (
        <Space size={10} align="center">
          <Avatar
            size={32}
            src={record.customerImage}
            className="border border-gray-200"
          />
          <span className="text-sm text-[#5E5873] font-normal">{text}</span>
        </Space>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "15%",
      render: (text) => (
        <span className="text-sm text-[#5E5873] font-normal">{text}</span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "12%",
      render: (amount) => (
        <span className="text-sm text-[#5E5873] font-normal">${amount}</span>
      ),
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      width: "12%",
      render: (amount) => (
        <span className="text-sm text-[#5E5873] font-normal">${amount}</span>
      ),
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
      width: "13%",
      render: (amount) => (
        <span className="text-sm text-[#5E5873] font-normal">
          ${amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => getStatusTag(status),
    },
    {
      title: "",
      key: "actions",
      width: "8%",
      align: "center",
      render: (_, record) => (
        <Space size={8}>
          <div className="w-8 h-8 border border-[#D8D6DE] rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer">
            <EyeOutlined
              className="text-[#6E6B7B] text-base"
              onClick={() => handleView(record)}
            />
          </div>
          <div className="w-8 h-8 border border-[#D8D6DE] rounded flex items-center justify-center hover:bg-red-50 cursor-pointer">
            <DeleteOutlined
              className="text-[#EA5455] text-base"
              onClick={() => handleDelete(record)}
            />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-[#5E5873] mb-1">
              Invoices
            </h1>
            <p className="text-sm text-[#B9B9C3]">Manage your stock invoices</p>
          </div>
          <Space size={8}>
            <Button className="bg-white hover:bg-gray-50 text-[#6E6B7B] border border-[#D8D6DE] w-16 h-10 px-3 rounded font-medium text-sm">
              PDF
            </Button>
            <Button className="bg-white hover:bg-gray-50 text-[#6E6B7B] border border-[#D8D6DE] w-16 h-10 px-3 rounded font-medium text-sm">
              XLS
            </Button>
            <Button
              icon={<ReloadOutlined className="text-base text-[#6E6B7B]" />}
              className="w-10 h-10 flex items-center justify-center border border-[#D8D6DE] rounded hover:bg-gray-50 bg-white"
              onClick={handleRefresh}
            />
            <Button
              icon={<UpOutlined className="text-base text-[#6E6B7B]" />}
              className="w-10 h-10 flex items-center justify-center border border-[#D8D6DE] rounded hover:bg-gray-50 bg-white"
            />
          </Space>
        </div>

        {/* Filters - Now with Search in Header Area */}
        <div className="bg-white px-6 py-4 flex gap-3 items-center">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined className="text-[#B9B9C3]" />}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[500px] h-11 rounded border-[#D8D6DE]"
          />
          <div className="flex-1" />
          <Select
            placeholder="Customer"
            className="w-36"
            value={filters.customer}
            onChange={(value) => handleFilterChange("customer", value)}
            allowClear
            size="large"
            suffixIcon={<span className="text-[#B9B9C3] text-xs">▼</span>}
          >
            <Option value="carl">Carl Evans</Option>
            <Option value="minerva">Minerva Rameriz</Option>
            <Option value="robert">Robert Lamon</Option>
          </Select>
          <Select
            placeholder="Status"
            className="w-32"
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            allowClear
            size="large"
            suffixIcon={<span className="text-[#B9B9C3] text-xs">▼</span>}
          >
            <Option value="paid">Paid</Option>
            <Option value="unpaid">Unpaid</Option>
            <Option value="overdue">Overdue</Option>
          </Select>
          <Select
            className="w-52"
            value={filters.sortBy}
            onChange={(value) => handleFilterChange("sortBy", value)}
            size="large"
            suffixIcon={<span className="text-[#B9B9C3] text-xs">▼</span>}
          >
            <Option value="Last 7 Days">Sort By : Last 7 Days</Option>
            <Option value="Last 30 Days">Last 30 Days</Option>
            <Option value="Last 90 Days">Last 90 Days</Option>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm overflow-hidden">
          <style>
            {`
              .ant-table-wrapper .ant-table {
                font-size: 14px;
              }
              .ant-table-wrapper .ant-table-thead > tr > th {
                background-color: #FAFAFA;
                color: #5E5873;
                font-weight: 600;
                border-bottom: 1px solid #EBE9F1;
                padding: 12px 16px;
                font-size: 13px;
                white-space: nowrap;
              }
              .ant-table-wrapper .ant-table-tbody > tr > td {
                padding: 12px 16px;
                border-bottom: 1px solid #EBE9F1;
                vertical-align: middle;
              }
              .ant-table-wrapper .ant-table-tbody > tr:hover > td {
                background-color: #FAFAFA;
              }
              .ant-select-single .ant-select-selector {
                height: 40px !important;
                display: flex;
                align-items: center;
                border-radius: 6px;
                border-color: #D8D6DE;
                background-color: #FAFAFA;
              }
              .ant-input {
                border-radius: 6px;
                background-color: #FAFAFA;
              }
              .ant-btn {
                border-radius: 6px;
              }
              .ant-table-wrapper .ant-table-selection-column {
                padding-left: 16px;
                width: 50px;
              }
              .ant-checkbox-wrapper {
                display: flex;
                align-items: center;
              }
            `}
          </style>
          <Table
            columns={columns}
            dataSource={invoices}
            loading={loading}
            pagination={false}
            onChange={handleTableChange}
            rowSelection={rowSelection}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>

      {/* View Modal */}
      <Modal
        open={viewModalVisible}
        title={
          <span className="text-xl font-semibold text-[#5E5873]">
            {selectedInvoice ? `Invoice ${selectedInvoice.invoiceNo}` : "Invoice Details"}
          </span>
        }
        onCancel={closeViewModal}
        footer={[
          <Button key="close" onClick={closeViewModal} size="large" className="px-6">
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedInvoice && (
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#5E5873]">Invoice No:</span>
              <span className="text-sm text-[#6E6B7B]">{selectedInvoice.invoiceNo}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#5E5873]">Customer:</span>
              <span className="text-sm text-[#6E6B7B]">{selectedInvoice.customer}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#5E5873]">Due Date:</span>
              <span className="text-sm text-[#6E6B7B]">{selectedInvoice.dueDate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#5E5873]">Amount:</span>
              <span className="text-sm text-[#6E6B7B]">${selectedInvoice.amount}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#5E5873]">Paid:</span>
              <span className="text-sm text-[#6E6B7B]">${selectedInvoice.paid}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#5E5873]">Amount Due:</span>
              <span className="text-sm text-[#6E6B7B]">${selectedInvoice.amountDue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm font-semibold text-[#5E5873]">Status:</span>
              <span className="text-sm">{getStatusTag(selectedInvoice.status)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Invoices;