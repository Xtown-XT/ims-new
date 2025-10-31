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
  Modal,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  Upload,
} from "antd";
import {
  SearchOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  PlusOutlined,
  ImportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  ReloadOutlined,
  VerticalAlignTopOutlined,
  InboxOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const Purchases = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);

  const showAddModal = () => setIsAddModalVisible(true);
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const showImportModal = () => setIsImportModalVisible(true);
  const handleImportCancel = () => {
    setIsImportModalVisible(false);
    form.resetFields();
  };

  const handleAddPurchase = (values) => {
    console.log("Add Purchase Form values:", values);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleImportPurchase = (values) => {
    console.log("Import Purchase values:", values);
    setIsImportModalVisible(false);
    form.resetFields();
  };

  const handlePageSizeChange = (value) => setPageSize(value);

  // ✅ Purchase Data
  const data = [
    {
      key: "1",
      supplier: "Electro Mart",
      reference: "PT001",
      date: "24 Dec 2024",
      status: "Received",
      total: "$1000",
      paid: "$1000",
      due: "$0.00",
      paymentStatus: "Paid",
    },
    {
      key: "2",
      supplier: "Quantum Gadgets",
      reference: "PT002",
      date: "10 Dec 2024",
      status: "Pending",
      total: "$1500",
      paid: "$0.00",
      due: "$1500",
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
      Paid: { background: "#d4edda", color: "#155724", dotColor: "#28a745" },
      Unpaid: { background: "#f8d7da", color: "#721c24", dotColor: "#dc3545" },
      Overdue: { background: "#fff3cd", color: "#856404", dotColor: "#ffc107" },
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

  const columns = [
    { title: "Supplier Name", dataIndex: "supplier", key: "supplier" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Date", dataIndex: "date", key: "date" },
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
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const menuItems = [
    { key: "1", label: "Paid" },
    { key: "2", label: "Unpaid" },
    { key: "3", label: "Overdue" },
  ];

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
          <h2 style={{ marginBottom: 0 }}>Purchase</h2>
          <p style={{ color: "#888" }}>Manage your purchases</p>
        </div>

        <Space>
          <Button icon={<FilePdfOutlined />} danger />
          <Button icon={<FileExcelOutlined />} type="primary" ghost />
          <Button icon={<ReloadOutlined />} />
          <Button icon={<VerticalAlignTopOutlined />} />
          <Button icon={<PlusOutlined />} type="primary" onClick={showAddModal}>
            Add Purchase
          </Button>
          <Button
            icon={<ImportOutlined />}
            style={{ background: "#001529", color: "white" }}
            onClick={showImportModal}
          >
            Import Purchase
          </Button>
        </Space>
      </div>

      {/* Search & Filter */}
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
        <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
          <Button>
            Payment Status <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
      />

      {/* ✅ Add Purchase Modal */}
      <Modal
        title="Add Purchase"
        open={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
        width={1000}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleAddPurchase}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Supplier Name"
                name="supplier"
                rules={[{ required: true, message: "Please select supplier" }]}
              >
                <Select placeholder="Select">
                  <Option value="Electro Mart">Electro Mart</Option>
                  <Option value="Prime Mart">Prime Mart</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Reference"
                name="reference"
                rules={[{ required: true, message: "Please enter reference" }]}
              >
                <Input placeholder="Enter Reference" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: "Please select product" }]}
          >
            <Input placeholder="Search Product" />
          </Form.Item>

          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <Table
              size="small"
              columns={[
                { title: "Product", dataIndex: "product" },
                { title: "Qty", dataIndex: "qty" },
                { title: "Purchase Price($)", dataIndex: "price" },
                { title: "Discount($)", dataIndex: "discount" },
                { title: "Tax(%)", dataIndex: "tax" },
                { title: "Tax Amount($)", dataIndex: "taxAmount" },
                { title: "Unit Cost($)", dataIndex: "unitCost" },
                { title: "Total Cost(%)", dataIndex: "totalCost" },
              ]}
              dataSource={[]}
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
              }}
            />
          </div>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Order Tax"
                name="orderTax"
                rules={[{ required: true, message: "Enter order tax" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: "Enter discount" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Shipping"
                name="shipping"
                rules={[{ required: true, message: "Enter shipping" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Select status" }]}
              >
                <Select placeholder="Select">
                  <Option value="Ordered">Ordered</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Received">Received</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleAddCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ✅ Import Purchase Modal (unchanged) */}
      <Modal
        title="Import Purchase"
        open={isImportModalVisible}
        onCancel={handleImportCancel}
        footer={null}
        width={700}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleImportPurchase}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Supplier Name"
                name="supplier"
                rules={[{ required: true, message: "Please select supplier" }]}
              >
                <Select placeholder="Select Supplier">
                  <Option value="Electro Mart">Electro Mart</Option>
                  <Option value="Prime Mart">Prime Mart</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select Status">
                  <Option value="Ordered">Ordered</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Received">Received</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Button
            icon={<DownloadOutlined />}
            type="default"
            style={{
              background: "#ff9f43",
              color: "#fff",
              marginBottom: "15px",
            }}
          >
            Download Sample File
          </Button>

          <Form.Item
            label="Upload CSV File"
            name="file"
            rules={[{ required: true, message: "Please upload a file" }]}
          >
            <Dragger
              name="file"
              multiple={false}
              accept=".csv"
              style={{
                padding: "10px 0",
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: "orange" }} />
              </p>
              <p className="ant-upload-text" style={{ color: "gray" }}>
                Drag and drop a file to upload
              </p>
            </Dragger>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Order Tax"
                name="orderTax"
                rules={[{ required: true, message: "Enter order tax" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: "Enter discount" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Shipping"
                name="shipping"
                rules={[{ required: true, message: "Enter shipping" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleImportCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Purchases;
