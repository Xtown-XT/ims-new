import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Dropdown,
  Pagination,
  Tooltip,
  Image,
  Modal,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

// ✅ React Icons (updated icons)
import { FaFilePdf, FaFileExcel, FaAngleUp } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";

// 🖼️ Imported Product Images
import LenovoIdeaPad3 from "./assets/LenovoIdeaPad.jpeg";
import Bold from "./assets/Bold.jpeg";
import NikeJordan from "./assets/NikeJordan.jpeg";
import AppleWatch from "./assets/AppleWatch.jpeg";
import AmazonEchoDot from "./assets/AmazonEchoDot.jpeg";
import LobarHandy from "./assets/LobarHandy.jpeg";
import RedPremiunHandy from "./assets/RedPremiunHandy.jpeg";
import Iphone14Pro from "./assets/Iphone14Pro.jpeg";
import GamingChair from "./assets/GamingChair.jpeg";
import BorealisBackpack from "./assets/BorealisBackpack.jpeg";

const { Option } = Select;
const { TextArea } = Input;

const PurchaseReturn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);

  // Show / Hide Modal
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    console.log("Submitted Values:", values);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  // 🧾 Table Data (10 products)
  const data = [
    {
      key: "1",
      image: LenovoIdeaPad3,
      date: "24 Dec 2024",
      supplier: "Electro Mart",
      reference: "PR001",
      status: "Received",
      total: "$1000",
      paid: "$1000",
      due: "$0.00",
      paymentStatus: "Paid",
    },
    {
      key: "2",
      image: Bold,
      date: "10 Dec 2024",
      supplier: "Quantum Gadgets",
      reference: "PR002",
      status: "Pending",
      total: "$1500",
      paid: "$0.00",
      due: "$1500",
      paymentStatus: "Unpaid",
    },
    {
      key: "3",
      image: NikeJordan,
      date: "27 Nov 2024",
      supplier: "Prime Bazaar",
      reference: "PR003",
      status: "Received",
      total: "$1500",
      paid: "$1500",
      due: "$0.00",
      paymentStatus: "Paid",
    },
    {
      key: "4",
      image: AppleWatch,
      date: "18 Nov 2024",
      supplier: "Gadget World",
      reference: "PR004",
      status: "Received",
      total: "$2000",
      paid: "$1000",
      due: "$1000",
      paymentStatus: "Overdue",
    },
    {
      key: "5",
      image: AmazonEchoDot,
      date: "06 Nov 2024",
      supplier: "Volt Vault",
      reference: "PR005",
      status: "Pending",
      total: "$800",
      paid: "$400",
      due: "$400",
      paymentStatus: "Unpaid",
    },
    {
      key: "6",
      image: LobarHandy,
      date: "25 Oct 2024",
      supplier: "Elite Retail",
      reference: "PR006",
      status: "Received",
      total: "$750",
      paid: "$750",
      due: "$0.00",
      paymentStatus: "Paid",
    },
    {
      key: "7",
      image: RedPremiunHandy,
      date: "14 Oct 2024",
      supplier: "Prime Mart",
      reference: "PR007",
      status: "Received",
      total: "$1300",
      paid: "$1300",
      due: "$0.00",
      paymentStatus: "Paid",
    },
    {
      key: "8",
      image: Iphone14Pro,
      date: "10 Oct 2024",
      supplier: "NeoTech Store",
      reference: "PR008",
      status: "Pending",
      total: "$1100",
      paid: "$0.00",
      due: "$1100",
      paymentStatus: "Unpaid",
    },
    {
      key: "9",
      image: GamingChair,
      date: "20 Sep 2024",
      supplier: "Urban Mart",
      reference: "PR009",
      status: "Received",
      total: "$2300",
      paid: "$2300",
      due: "$0.00",
      paymentStatus: "Paid",
    },
    {
      key: "10",
      image: BorealisBackpack,
      date: "10 Sep 2024",
      supplier: "Travel Mart",
      reference: "PR010",
      status: "Pending",
      total: "$1700",
      paid: "$0.00",
      due: "$1700",
      paymentStatus: "Unpaid",
    },
  ];

  // ✅ Status Tag
  const getStatusTag = (status) => {
    const styles = {
      Received: { background: "#28a745", color: "#fff" },
      Pending: { background: "#17a2b8", color: "#fff" },
      Ordered: { background: "#ffc107", color: "#000" },
    };

    const current = styles[status] || styles.Pending;

    return (
      <Tag
        style={{
          background: current.background,
          color: current.color,
          borderRadius: "4px",
          fontWeight: 500,
          fontSize: "11px",
          padding: "1px 8px",
          height: "22px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          width: "auto",
        }}
      >
        {status}
      </Tag>
    );
  };

  // ✅ Payment Status Tag
  const getPaymentTag = (status) => {
    const styles = {
      Paid: {
        background: "#d4edda",
        color: "#155724",
        dotColor: "#28a745",
      },
      Unpaid: {
        background: "#f8d7da",
        color: "#721c24",
        dotColor: "#dc3545",
      },
      Overdue: {
        background: "#fff3cd",
        color: "#856404",
        dotColor: "#ffc107",
      },
    };

    const current = styles[status] || styles.Paid;

    return (
      <Tag
        style={{
          background: current.background,
          color: current.color,
          borderRadius: "4px",
          fontWeight: 500,
          fontSize: "10.5px",
          padding: "1px 6px",
          height: "22px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          width: "auto",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: current.dotColor,
            display: "inline-block",
            marginRight: "4px",
          }}
        ></span>
        {status}
      </Tag>
    );
  };

  // 🧩 Table Columns
  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: "checkbox",
      key: "checkbox",
      render: () => <input type="checkbox" />,
      width: 50,
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <Image
          src={src}
          alt="product"
          width={40}
          height={40}
          style={{ borderRadius: 8, objectFit: "cover" }}
          preview={false}
        />
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Supplier Name", dataIndex: "supplier", key: "supplier" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => getStatusTag(text),
    },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "Paid", dataIndex: "paid", key: "paid" },
    { title: "Due", dataIndex: "due", key: "due" },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) => getPaymentTag(text),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              style={{
                borderRadius: "8px",
                border: "1px solid #e6e9eb",
                background: "#fff",
                color: "#1e2a35",
                width: "36px",
                height: "36px",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              style={{
                borderRadius: "8px",
                border: "1px solid #e6e9eb",
                background: "#fff",
                color: "#1e2a35",
                width: "36px",
                height: "36px",
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const statusMenu = {
    items: [
      { key: "1", label: "Paid" },
      { key: "2", label: "Unpaid" },
    ],
  };

  const sortMenu = {
    items: [
      { key: "1", label: "Recently Added" },
      { key: "2", label: "Ascending" },
      { key: "3", label: "Descending" },
      { key: "4", label: "Last Month" },
      { key: "5", label: "Last 7 Days" },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ marginBottom: 0 }}>Purchase Returns</h2>
          <p style={{ color: "#888" }}>Manage your purchase return</p>
        </div>
        <Space>
          {/* 🧩 Updated Icons */}
          <Button icon={<FaFilePdf color="red" size={16} />} />
          <Button icon={<FaFileExcel color="green" size={16} />} />
          <Button icon={<IoReloadOutline color="#1677ff" size={18} />} />
          <Button icon={<FaAngleUp color="#333" size={16} />} />
          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{ background: "orange", borderColor: "orange" }}
            onClick={showModal}
          >
            Add Sales Return
          </Button>
        </Space>
      </div>

      {/* Search + Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          style={{ width: "250px" }}
        />
        <Space>
          <Dropdown menu={statusMenu} placement="bottomRight" arrow>
            <Button>
              Status <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown menu={sortMenu} placement="bottomRight" arrow>
            <Button>
              Sort By : Recently Added <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        rowKey="key"
      />

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Row Per Page</span>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: 80 }}
            options={[
              { value: 10, label: "10" },
              { value: 25, label: "25" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
            ]}
          />
          <span>Entries</span>
        </div>
        <Pagination current={1} total={10} pageSize={pageSize} />
      </div>

      {/* Modal Form */}
      <Modal
        title={<h3 style={{ margin: 0 }}>Add Purchase Return</h3>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: "10px" }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="supplier"
                label="Supplier Name"
                rules={[{ required: true, message: "Please select supplier" }]}
              >
                <Select
                  placeholder="Select"
                  suffixIcon={<PlusCircleOutlined />}
                >
                  <Option value="Electro Mart">Electro Mart</Option>
                  <Option value="Prime Bazaar">Prime Bazaar</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="reference"
                label="Reference"
                rules={[{ required: true, message: "Please enter reference" }]}
              >
                <Input placeholder="Enter reference" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="product"
            label="Product"
            rules={[{ required: true, message: "Please search product" }]}
          >
            <Input placeholder="Search Product" />
          </Form.Item>

          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: "10px",
              background: "#f9fafc",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <Table columns={columns} dataSource={[]} pagination={false} scroll={{ x: true }} />
          </div>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="orderTax"
                label="Order Tax"
                rules={[{ required: true, message: "Please enter order tax" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="discount"
                label="Discount"
                rules={[{ required: true, message: "Please enter discount" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="shipping"
                label="Shipping"
                rules={[{ required: true, message: "Please enter shipping" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select">
                  <Option value="Pending">Pending</Option>
                  <Option value="Returned">Returned</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <TextArea
              rows={4}
              placeholder="Type your message"
              showCount
              maxLength={300}
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={handleCancel}
              style={{
                background: "#001529",
                color: "white",
                border: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: "#F39C12",
                borderColor: "#F39C12",
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PurchaseReturn;