import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Avatar,
  Modal,
  DatePicker,
  InputNumber,
  Form,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  SearchOutlined,
  PlusOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  ExpandOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;

// ✅ Correct image imports
import lenovoImg from "../Sales/assets/LenovoideaPad3.png";
import boldImg from "../Sales/assets/Bold.png";
import iphoneImg from "../Sales/assets/iphone14Pro.png";
import watchImg from "../Sales/assets/AppleWatch.png";
import echoImg from "../Sales/assets/AmazonEchoDot.png";

const Quotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({
    product: null,
    customer: null,
    status: null,
    sortBy: "Last 7 Days",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchQuotations();
  }, []);

  // ✅ Sample data
  const fetchQuotations = async () => {
    setLoading(true);
    setQuotations([
      {
        key: "1",
        productName: "Lenovo 3rd Generation",
        productImage: lenovoImg,
        customer: "Carl Evans",
        customerImage: "https://i.pravatar.cc/150?img=12",
        status: "Sent",
        total: 550,
      },
      {
        key: "2",
        productName: "Bold V3.2",
        productImage: boldImg,
        customer: "Minerva Rameriz",
        customerImage: "https://i.pravatar.cc/150?img=45",
        status: "Sent",
        total: 430,
      },
      {
        key: "3",
        productName: "iPhone 14 Pro",
        productImage: iphoneImg,
        customer: "Robert Lamon",
        customerImage: "https://i.pravatar.cc/150?img=33",
        status: "Ordered",
        total: 260,
      },
      {
        key: "4",
        productName: "Apple Series 5 Watch",
        productImage: watchImg,
        customer: "Mark Joslyn",
        customerImage: "https://i.pravatar.cc/150?img=13",
        status: "Sent",
        total: 470,
      },
      {
        key: "5",
        productName: "Amazon Echo Dot",
        productImage: echoImg,
        customer: "Patricia Lewis",
        customerImage: "https://i.pravatar.cc/150?img=20",
        status: "Pending",
        total: 380,
      },
    ]);
    setLoading(false);
  };

  const handleTableChange = (newPagination) => setPagination(newPagination);
  const handleSearch = (value) => setSearchTerm(value);
  const handleFilterChange = (filterName, value) =>
    setFilters({ ...filters, [filterName]: value });

  const handleAddQuotation = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  const getStatusTag = (status) => {
    const styles = {
      Sent: "bg-[#28C76F] text-white",
      Pending: "bg-[#00CFE8] text-white",
      Ordered: "bg-[#FF9F43] text-white",
    };
    const style = styles[status] || styles.Sent;
    return (
      <span className={`text-xs font-medium px-3 py-1 rounded ${style}`}>
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
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: "30%",
      render: (text, record) => (
        <Space size={10} align="center">
          <img
            src={record.productImage}
            alt={record.productName}
            className="w-9 h-9 object-contain rounded"
          />
          <span className="text-sm text-[#5E5873] font-normal">{text}</span>
        </Space>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
      width: "25%",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "15%",
      render: (amount) => (
        <span className="text-sm text-[#5E5873] font-normal">${amount}</span>
      ),
    },
    {
      title: "",
      key: "actions",
      width: "15%",
      align: "center",
      render: () => (
        <Space size={8}>
          <div className="w-8 h-8 border border-[#D8D6DE] rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer">
            <EyeOutlined className="text-[#6E6B7B] text-base" />
          </div>
          <div className="w-8 h-8 border border-[#D8D6DE] rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer">
            <EditOutlined className="text-[#6E6B7B] text-base" />
          </div>
          <div className="w-8 h-8 border border-[#D8D6DE] rounded flex items-center justify-center hover:bg-red-50 cursor-pointer">
            <DeleteOutlined className="text-[#EA5455] text-base" />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-[#5E5873] mb-1">
              Quotation List
            </h1>
            <p className="text-sm text-[#B9B9C3]">Manage Your Quotation</p>
          </div>
          <Space size={8}>
            <Button
              icon={<FilePdfOutlined className="text-base text-[#EA5455]" />}
              className="w-9 h-9 flex items-center justify-center border border-[#D8D6DE] rounded hover:bg-gray-50 bg-white"
            />
            <Button
              icon={<FileExcelOutlined className="text-base text-[#28C76F]" />}
              className="w-9 h-9 flex items-center justify-center border border-[#D8D6DE] rounded hover:bg-gray-50 bg-white"
            />
            <Button
              icon={<ReloadOutlined className="text-base text-[#6E6B7B]" />}
              className="w-9 h-9 flex items-center justify-center border border-[#D8D6DE] rounded hover:bg-gray-50 bg-white"
            />
            <Button
              icon={<ExpandOutlined className="text-base text-[#6E6B7B]" />}
              className="w-9 h-9 flex items-center justify-center border border-[#D8D6DE] rounded hover:bg-gray-50 bg-white"
            />
            <Button
              type="primary"
              icon={<PlusOutlined className="text-sm" />}
              className="bg-[#FF9F43] hover:bg-[#FF9F43] border-0 h-9 px-5 rounded text-white font-medium text-sm shadow-sm"
              onClick={handleAddQuotation}
            >
              Add Quotation
            </Button>
          </Space>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined className="text-[#B9B9C3]" />}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[420px] h-10 rounded border-[#D8D6DE]"
          />
          <Select
            placeholder="Product"
            className="w-44"
            value={filters.product}
            onChange={(value) => handleFilterChange("product", value)}
            allowClear
            size="large"
          >
            <Option value="lenovo">Lenovo 3rd Generation</Option>
            <Option value="bold">Bold V3.2</Option>
            <Option value="iphone">iPhone 14 Pro</Option>
          </Select>
          <Select
            placeholder="Customer"
            className="w-44"
            value={filters.customer}
            onChange={(value) => handleFilterChange("customer", value)}
            allowClear
            size="large"
          >
            <Option value="carl">Carl Evans</Option>
            <Option value="minerva">Minerva Rameriz</Option>
            <Option value="robert">Robert Lamon</Option>
          </Select>
          <Select
            placeholder="Status"
            className="w-44"
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            allowClear
            size="large"
          >
            <Option value="sent">Sent</Option>
            <Option value="pending">Pending</Option>
            <Option value="ordered">Ordered</Option>
          </Select>
          <Select
            className="w-52"
            value={filters.sortBy}
            onChange={(value) => handleFilterChange("sortBy", value)}
            size="large"
          >
            <Option value="Last 7 Days">Sort By : Last 7 Days</Option>
            <Option value="Last 30 Days">Last 30 Days</Option>
            <Option value="Last 90 Days">Last 90 Days</Option>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <Table
            columns={columns}
            dataSource={quotations}
            loading={loading}
            pagination={false}
            onChange={handleTableChange}
            rowSelection={rowSelection}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={<span className="text-xl font-semibold text-[#5E5873]">Add Quotation</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ orderTax: 0, discount: 0, shipping: 0 }}
        >
          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true, message: "Please select a customer" }]}
            >
              <Select placeholder="Select Customer" size="large">
                <Option value="carl">Carl Evans</Option>
                <Option value="minerva">Minerva Rameriz</Option>
                <Option value="robert">Robert Lamon</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please choose a date" }]}
            >
              <DatePicker className="w-full" size="large" />
            </Form.Item>

            <Form.Item
              name="reference"
              label="Reference"
              rules={[{ required: true, message: "Please enter a reference" }]}
            >
              <Input placeholder="Enter reference" size="large" />
            </Form.Item>
          </div>

          <Form.Item
            name="product"
            label="Product"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Input placeholder="Please type product code and select" size="large" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={4} placeholder="Enter description..." />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={handleCancel} size="large" className="px-6">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#FF9F43] hover:bg-[#FF9F43] border-0 px-6"
              size="large"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Quotation;
