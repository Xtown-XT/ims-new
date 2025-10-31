import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Avatar,
  Space,
  Select,
  Modal,
  Form,
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
  UpOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import LenovoIdeaPad3 from "../Stock/assets/LenovoIdeaPad3.jpg";
import BeatsPro from "../Stock/assets/BeatsPro.jpg";
import NikeJordan from "../Stock/assets/NikeJordan.jpg";
import AppleSeries5Watch from "../Stock/assets/AppleSeries5Watch.jpg";
import AmazonEchoDot from "../Stock/assets/AmazonEchoDot.jpg";
import LobarHandy from "../Stock/assets/LobarHandy.jpg";
import RedPremiumSatchel from "../Stock/assets/RedPremiumSatchel.jpg";
import Iphone14Pro from "../Stock/assets/Iphone14Pro.jpg";
import GamingChair from "../Stock/assets/GamingChair.jpg";
import BorealisBackpack from "../Stock/assets/BorealisBackpack.jpg";
import JamesKirwin from "../Stock/assets/JamesKirwin.png";
import FrancisChang from "../Stock/assets/FrancisChang.png";
import AntonioEngle from "../Stock/assets/AntonioEngle.png";
import LeoKelly from "../Stock/assets/LeoKelly.png";
import AnnetteWalker from "../Stock/assets/AnnetteWalker.png";
import JohnWeaver from "../Stock/assets/JohnWeaver.png";
import GaryHennessy from "../Stock/assets/GaryHennessy.png";
import EleanorPanek from "../Stock/assets/EleanorPanek.png";
import WilliamLevy from "../Stock/assets/WilliamLevy.png";
import CharlotteKlotz from "../Stock/assets/CharlotteKlotz.png";

const StockAdjustment = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [pageSize, setPageSize] = useState(10);
  const [collapsed, setCollapsed] = useState(false);

  // modal state + form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const submitAdjustment = (values) => {
    // handle create adjustment logic here
    console.log("Create Adjustment:", values);
    closeModal();
  };

  const dataSource = [
    {
      key: "1",
      warehouse: "Lavish Warehouse",
      store: "Electro Mart",
      product: { name: "Lenovo IdeaPad 3", img: LenovoIdeaPad3 },
      date: "24 Dec 2024",
      person: { name: "James Kirwin", img: JamesKirwin },
      qty: 100,
    },
    {
      key: "2",
      warehouse: "Quaint Warehouse",
      store: "Quantum Gadgets",
      product: { name: "Beats Pro", img: BeatsPro },
      date: "10 Dec 2024",
      person: { name: "Francis Chang", img: FrancisChang },
      qty: 140,
    },
    {
      key: "3",
      warehouse: "Overflow Warehouse",
      store: "Prime Bazaar",
      product: { name: "Nike Jordan", img: NikeJordan },
      date: "25 Jul 2023",
      person: { name: "Antonio Engle", img: AntonioEngle },
      qty: 120,
    },
    {
      key: "4",
      warehouse: "Quaint Warehouse",
      store: "Gadget World",
      product: { name: "Apple Series 5 Watch", img: AppleSeries5Watch },
      date: "28 Jul 2023",
      person: { name: "Leo Kelly", img: LeoKelly },
      qty: 130,
    },
    {
      key: "5",
      warehouse: "Traditional Warehouse",
      store: "Volt Vault",
      product: { name: "Amazon Echo Dot", img: AmazonEchoDot },
      date: "24 Jul 2023",
      person: { name: "Annette Walker", img: AnnetteWalker },
      qty: 140,
    },
    {
      key: "6",
      warehouse: "Cool Warehouse",
      store: "Elite Retail",
      product: { name: "Lobar Handy", img: LobarHandy },
      date: "15 Jul 2023",
      person: { name: "John Weaver", img: JohnWeaver },
      qty: 150,
    },
    {
      key: "7",
      warehouse: "Retail Supply Hub",
      store: "Prime Mart",
      product: { name: "Red Premium Satchel", img: RedPremiumSatchel },
      date: "14 Oct 2024",
      person: { name: "Gary Hennessy", img: GaryHennessy },
      qty: 700,
    },
    {
      key: "8",
      warehouse: "EdgeWare Solutions",
      store: "NeoTech Store",
      product: { name: "iPhone 14 Pro", img: Iphone14Pro },
      date: "03 Oct 2024",
      person: { name: "Eleanor Panek", img: EleanorPanek },
      qty: 630,
    },
    {
      key: "9",
      warehouse: "North Zone Warehouse",
      store: "Urban Mart",
      product: { name: "Gaming Chair", img: GamingChair },
      date: "20 Sep 2024",
      person: { name: "William Levy", img: WilliamLevy },
      qty: 410,
    },
    {
      key: "10",
      warehouse: "Fulfillment Hub",
      store: "Travel Mart",
      product: { name: "Borealis Backpack", img: BorealisBackpack },
      date: "10 Sep 2024",
      person: { name: "Charlotte Klotz", img: CharlotteKlotz },
      qty: 550,
    },
  ];

  const filteredData = dataSource.filter(
    (item) =>
      item.product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Warehouse",
      dataIndex: "warehouse",
      key: "warehouse",
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <Space>
          <Avatar shape="square" src={record.product.img} />
          <span>{record.product.name}</span>
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Person",
      key: "person",
      render: (_, record) => (
        <Space>
          <Avatar src={record.person.img} />
          <span>{record.person.name}</span>
        </Space>
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
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

  // menu for header compact dropdown
  const menu = (
    <Menu
      items={[
        { key: "1", label: "Warehouse" },
        { key: "2", label: "Store" },
        { key: "3", label: "Product" },
      ]}
    />
  );

  // Warehouse dropdown content (for filter)
  const warehouseMenu = (
    <Menu>
      <Menu.Item key="w1">Lavish Warehouse</Menu.Item>
      <Menu.Item key="w2">Quaint Warehouse</Menu.Item>
      <Menu.Item key="w3">Overflow Warehouse</Menu.Item>
      <Menu.Item key="w4">Traditional Warehouse</Menu.Item>
      <Menu.Item key="w5">Cool Warehouse</Menu.Item>
    </Menu>
  );

  // Sort by dropdown content
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

  // options for Add Adjustment form selects
  const warehouseOptions = [
    { value: "Lavish Warehouse", label: "Lavish Warehouse" },
    { value: "Quaint Warehouse", label: "Quaint Warehouse" },
    { value: "Overflow Warehouse", label: "Overflow Warehouse" },
    { value: "Traditional Warehouse", label: "Traditional Warehouse" },
  ];
  const storeOptions = [
    { value: "Electro Mart", label: "Electro Mart" },
    { value: "Quantum Gadgets", label: "Quantum Gadgets" },
    { value: "Prime Bazaar", label: "Prime Bazaar" },
  ];
  const personOptions = [
    { value: "James Kirwin", label: "James Kirwin" },
    { value: "Francis Chang", label: "Francis Chang" },
    { value: "Antonio Engle", label: "Antonio Engle" },
  ];
  const productOptions = dataSource.map((d) => ({
    value: d.product.name,
    label: d.product.name,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-semibold">Stock Adjustment</h2>
          <p className="text-gray-500 text-sm">Manage your stock adjustment</p>
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
            icon={collapsed ? <DownOutlined /> : <UpOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="bg-white border-gray-200 hover:bg-gray-100 shadow-sm"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-orange-500 border-none hover:bg-orange-600"
            onClick={openModal}
          >
            Add Adjustment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-0 gap-3">
          {/* Search (left) */}
          <div className="flex-1 max-w-[220px]">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              className="w-full h-10 rounded-md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Dropdown overlay={warehouseMenu} trigger={["click"]}>
              <Button className="bg-white border rounded-md hover:bg-gray-100 shadow-sm">
                <Space>
                  Warehouse <DownOutlined />
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

      {/* Add Adjustment Modal */}
      <Modal
        title={<span className="font-semibold text-lg">Add Adjustment</span>}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={<CloseOutlined className="text-red-500" />}
        width={720}
      >
        <Form layout="vertical" form={form} onFinish={submitAdjustment}>
          {/* Product search */}
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={
                <span>
                  Warehouse <span className="text-red-500">*</span>
                </span>
              }
              name="warehouse"
              rules={[{ required: true, message: "Please select warehouse" }]}
            >
              <Select placeholder="Select" options={warehouseOptions} />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Reference Number <span className="text-red-500">*</span>
                </span>
              }
              name="reference"
              rules={[
                { required: true, message: "Please enter reference number" },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span>
                Store <span className="text-red-500">*</span>
              </span>
            }
            name="store"
            rules={[{ required: true, message: "Please select store" }]}
          >
            <Select placeholder="Select" options={storeOptions} />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Responsible Person <span className="text-red-500">*</span>
              </span>
            }
            name="person"
            rules={[
              { required: true, message: "Please select responsible person" },
            ]}
          >
            <Select placeholder="Select" options={personOptions} />
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
            <Button onClick={closeModal} className="bg-[#0e2954] text-white">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-orange-500 border-none hover:bg-orange-600"
            >
              Create Adjustment
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StockAdjustment;
