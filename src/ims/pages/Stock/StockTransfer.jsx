import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Space,
  Select,
  Modal,
  Form,
  Upload,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  PlusOutlined,
  SettingOutlined,
  DownOutlined,
  UploadOutlined,
  UpOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Dragger } = Upload;

const StockTransfer = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [pageSize, setPageSize] = useState(10);
  const [collapsed, setCollapsed] = useState(false);

  // modal states + forms
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [addForm] = Form.useForm();
  const [importForm] = Form.useForm();

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
  };
  const submitAddTransfer = (values) => {
    console.log("Add Transfer:", values);
    closeAddModal();
  };

  const openImportModal = () => setIsImportModalOpen(true);
  const closeImportModal = () => {
    setIsImportModalOpen(false);
    importForm.resetFields();
  };
  const submitImport = (values) => {
    console.log("Import Transfer:", values);
    closeImportModal();
  };

  const dataSource = [
    {
      key: "1",
      fromWarehouse: "Lavish Warehouse",
      toWarehouse: "North Zone Warehouse",
      noOfProducts: 20,
      qtyTransferred: 15,
      refNumber: "#458924",
      date: "24 Dec 2024",
    },
    {
      key: "2",
      fromWarehouse: "Lobar Handy",
      toWarehouse: "Nova Storage Hub",
      noOfProducts: 4,
      qtyTransferred: 14,
      refNumber: "#145445",
      date: "25 Jul 2023",
    },
    {
      key: "3",
      fromWarehouse: "Quaint Warehouse",
      toWarehouse: "Cool Warehouse",
      noOfProducts: 21,
      qtyTransferred: 10,
      refNumber: "#135478",
      date: "28 Jul 2023",
    },
    {
      key: "4",
      fromWarehouse: "Traditional Warehouse",
      toWarehouse: "Retail Supply Hub",
      noOfProducts: 15,
      qtyTransferred: 14,
      refNumber: "#145124",
      date: "24 Jul 2023",
    },
    {
      key: "5",
      fromWarehouse: "Cool Warehouse",
      toWarehouse: "EdgeWare Solutions",
      noOfProducts: 14,
      qtyTransferred: 74,
      refNumber: "#474541",
      date: "15 Jul 2023",
    },
    {
      key: "6",
      fromWarehouse: "Overflow Warehouse",
      toWarehouse: "Quaint Warehouse",
      noOfProducts: 30,
      qtyTransferred: 20,
      refNumber: "#366713",
      date: "06 Nov 2024",
    },
    {
      key: "7",
      fromWarehouse: "Nova Storage Hub",
      toWarehouse: "Traditional Warehouse",
      noOfProducts: 10,
      qtyTransferred: 6,
      refNumber: "#327814",
      date: "25 Oct 2024",
    },
    {
      key: "8",
      fromWarehouse: "Retail Supply Hub",
      toWarehouse: "Overflow Warehouse",
      noOfProducts: 70,
      qtyTransferred: 60,
      refNumber: "#274509",
      date: "14 Oct 2024",
    },
    {
      key: "9",
      fromWarehouse: "EdgeWare Solutions",
      toWarehouse: "Lavish Warehouse",
      noOfProducts: 35,
      qtyTransferred: 30,
      refNumber: "#239073",
      date: "03 Oct 2024",
    },
    {
      key: "10",
      fromWarehouse: "North Zone Warehouse",
      toWarehouse: "Fulfillment Hub",
      noOfProducts: 15,
      qtyTransferred: 10,
      refNumber: "#187204",
      date: "20 Sep 2024",
    },
  ];

  const filteredData = dataSource.filter(
    (item) =>
      item.fromWarehouse.toLowerCase().includes(searchText.toLowerCase()) ||
      item.toWarehouse.toLowerCase().includes(searchText.toLowerCase()) ||
      item.refNumber.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "From Warehouse",
      dataIndex: "fromWarehouse",
      key: "fromWarehouse",
    },
    {
      title: "To Warehouse",
      dataIndex: "toWarehouse",
      key: "toWarehouse",
    },
    {
      title: "No of Products",
      dataIndex: "noOfProducts",
      key: "noOfProducts",
      align: "center",
    },
    {
      title: "Quantity Transferred",
      dataIndex: "qtyTransferred",
      key: "qtyTransferred",
      align: "center",
    },
    {
      title: "Ref Number",
      dataIndex: "refNumber",
      key: "refNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const fromMenu = (
    <Menu>
      <Menu.Item key="f1">Lavish Warehouse</Menu.Item>
      <Menu.Item key="f2">Lobar Handy</Menu.Item>
      <Menu.Item key="f3">Quaint Warehouse</Menu.Item>
      <Menu.Item key="f4">Traditional Warehouse</Menu.Item>
      <Menu.Item key="f5">Cool Warehouse</Menu.Item>
    </Menu>
  );

  const toMenu = (
    <Menu>
      <Menu.Item key="t1">North Zone Warehouse</Menu.Item>
      <Menu.Item key="t2">Nova Storage Hub</Menu.Item>
      <Menu.Item key="t3">EdgeWare Solutions</Menu.Item>
      <Menu.Item key="t4">Retail Supply Hub</Menu.Item>
    </Menu>
  );

  const sortMenu = (
    <Menu
      onClick={(e) => {
        setSortBy(e.key);
      }}
    >
      <Menu.Item key="Recently Added">Recently Added</Menu.Item>
      <Menu.Item key="Ascending">Ascending</Menu.Item>
      <Menu.Item key="Descending">Descending</Menu.Item>
      <Menu.Item key="Last Month">Last Month</Menu.Item>
      <Menu.Item key="Last 7 Days">Last 7 Days</Menu.Item>
    </Menu>
  );

  // options used in modals
  const warehouseOptions = [
    { value: "Lavish Warehouse", label: "Lavish Warehouse" },
    { value: "Lobar Handy", label: "Lobar Handy" },
    { value: "Quaint Warehouse", label: "Quaint Warehouse" },
    { value: "Traditional Warehouse", label: "Traditional Warehouse" },
    { value: "North Zone Warehouse", label: "North Zone Warehouse" },
    { value: "Nova Storage Hub", label: "Nova Storage Hub" },
  ];

  const productOptions = dataSource.map((d) => ({
    value: d.refNumber,
    label: `${d.refNumber} — ${d.fromWarehouse} → ${d.toWarehouse}`,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-semibold">Stock Transfer</h2>
          <p className="text-gray-500 text-sm">Manage your stock transfer</p>
        </div>
        <div className="flex items-center gap-2">
          {/* PDF / XLS / Refresh / Collapse */}
          <Button
            icon={<FilePdfOutlined />}
            className="bg-white border-gray-200 hover:bg-gray-100 shadow-sm"
          />
          <Button
            icon={<FileExcelOutlined />}
            className="bg-white border-gray-200 hover:bg-gray-100 shadow-sm"
          />
          <Button
            icon={<ReloadOutlined />}
            className="bg-white border-gray-200 hover:bg-gray-100 shadow-sm"
          />
          <Button
            icon={collapsed ? <UpOutlined /> : <UpOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="bg-white border-gray-200 hover:bg-gray-100 shadow-sm"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-orange-500 border-none hover:bg-orange-600"
            onClick={openAddModal}
          >
            Add New
          </Button>
          <Button
            icon={<UploadOutlined />}
            className="bg-[#05264E] text-white hover:bg-[#153b66]"
            onClick={openImportModal}
          >
            Import Transfer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center gap-3">
          <div className="flex-1 max-w-[300px]">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              className="w-full h-10 rounded-md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Dropdown overlay={fromMenu} trigger={["click"]}>
              <Button className="bg-white border rounded-md hover:bg-gray-100 shadow-sm">
                <Space>
                  From Warehouse <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={toMenu} trigger={["click"]}>
              <Button className="bg-white border rounded-md hover:bg-gray-100 shadow-sm">
                <Space>
                  To Warehouse <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={sortMenu} trigger={["click"]}>
              <Button className="bg-orange-100 border rounded-md hover:bg-orange-200 shadow-sm">
                <Space>
                  <span className="text-orange-600">Sort By : {sortBy}</span>
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={false}
          rowSelection={{}}
        />

        {/* Custom Pagination Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Row Per Page</span>
            <Select
              value={pageSize}
              style={{ width: 80 }}
              onChange={(value) => setPageSize(value)}
              options={[
                { value: 5, label: "5" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
              ]}
            />
            <span className="text-gray-600 text-sm">Entries</span>
          </div>

          <div className="flex items-center gap-2">
            <Button shape="circle" size="small">
              {"<"}
            </Button>
            <Button
              shape="circle"
              size="small"
              className="bg-orange-500 text-white border-none"
            >
              1
            </Button>
            <Button shape="circle" size="small">
              {">"}
            </Button>
          </div>
        </div>
      </div>

      {/* Add Transfer Modal */}
      <Modal
        title={<span className="font-semibold text-lg">Add Transfer</span>}
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={null}
        closeIcon={<CloseOutlined className="text-red-500" />}
        width={720}
      >
        <Form layout="vertical" form={addForm} onFinish={submitAddTransfer}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={
                <span>
                  Warehouse From <span className="text-red-500">*</span>
                </span>
              }
              name="warehouseFrom"
              rules={[{ required: true, message: "Please select warehouse" }]}
            >
              <Select placeholder="Select" options={warehouseOptions} />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Warehouse To <span className="text-red-500">*</span>
                </span>
              }
              name="warehouseTo"
              rules={[{ required: true, message: "Please select warehouse" }]}
            >
              <Select placeholder="Select" options={warehouseOptions} />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span>
                Reference Number <span className="text-red-500">*</span>
              </span>
            }
            name="referenceNumber"
            rules={[{ required: true, message: "Please enter reference number" }]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Product <span className="text-red-500">*</span>
              </span>
            }
            name="product"
            rules={[{ required: true, message: "Please select product" }]}
          >
            <Select
              showSearch
              placeholder="Search Product"
              options={productOptions}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Notes <span className="text-red-500">*</span>
              </span>
            }
            name="notes"
            rules={[{ required: true, message: "Please enter notes" }]}
          >
            <Input.TextArea rows={4} placeholder="Notes" />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={closeAddModal} className="bg-[#0e2954] text-white">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-orange-500 border-none hover:bg-orange-600"
            >
              Create
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Import Transfer Modal */}
      <Modal
        title={<span className="font-semibold text-lg">Import Transfer</span>}
        open={isImportModalOpen}
        onCancel={closeImportModal}
        footer={null}
        closeIcon={<CloseOutlined className="text-red-500" />}
        width={760}
      >
        <Form layout="vertical" form={importForm} onFinish={submitImport}>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label={<span>From <span className="text-red-500">*</span></span>}
              name="from"
              rules={[{ required: true, message: "Please select From" }]}
            >
              <Select placeholder="select" options={warehouseOptions} />
            </Form.Item>

            <Form.Item
              label={<span>To <span className="text-red-500">*</span></span>}
              name="to"
              rules={[{ required: true, message: "Please select To" }]}
            >
              <Select placeholder="Select" options={warehouseOptions} />
            </Form.Item>

            <Form.Item
              label={<span>Status <span className="text-red-500">*</span></span>}
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select" options={[
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ]} />
            </Form.Item>
          </div>

          <div className="flex justify-end mb-4">
            <Button className="bg-orange-500 text-white">Download Sample File</Button>
          </div>

          <Form.Item label="Upload CSV File" name="file">
            <Dragger
              name="file"
              multiple={false}
              beforeUpload={() => false}
              showUploadList={false}
              style={{ padding: 20 }}
            >
              <div className="text-center">
                <UploadOutlined style={{ fontSize: 36, color: "#ff8a3d" }} />
                <p className="mt-2">Drag and drop a file to upload</p>
                <p className="text-sm text-gray-500">or click to select file</p>
              </div>
            </Dragger>
          </Form.Item>

          <Form.Item
            label={<span>Shipping <span className="text-red-500">*</span></span>}
            name="shipping"
            rules={[{ required: true, message: "Please enter shipping" }]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={closeImportModal} className="bg-[#0e2954] text-white">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-orange-500 border-none hover:bg-orange-600"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StockTransfer;
