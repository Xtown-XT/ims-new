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
  DownOutlined,
  UpOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import LenovoIdeaPad3 from "../Stock/assets/LenovoIdeaPad3.jpg";
import BeatsPro from "../Stock/assets/BeatsPro.jpg";
import NikeJordan from "../Stock/assets/NikeJordan.jpg";
import AppeSeries5Watch from "../Stock/assets/AppleSeries5Watch.jpg";
import AmazonEchoDot from "../Stock/assets/AmazonEchoDot.jpg";
import JamesKirwin from "../Stock/assets/JamesKirwin.png";
import FrancisChang from "../Stock/assets/FrancisChang.png";
import Steven from "../Stock/assets/Steven.png";
import Gravely from "../Stock/assets/Gravely.png";
import Kevin from "../Stock/assets/Kevin.png";

const ManageStock = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddStock = (values) => {
    console.log("Added Stock:", values);
    setIsModalOpen(false);
    form.resetFields();
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
      warehouse: "Lobar Handy",
      store: "Prime Bazaar",
      product: { name: "Nike Jordan", img: NikeJordan },
      date: "25 Jul 2023",
      person: { name: "Steven", img: Steven },
      qty: 120,
    },
    {
      key: "4",
      warehouse: "Quaint Warehouse",
      store: "Gadget World",
      product: { name: "Apple Series 5 Watch", img: AppeSeries5Watch },
      date: "28 Jul 2023",
      person: { name: "Gravely", img: Gravely },
      qty: 130,
    },
    {
      key: "5",
      warehouse: "Traditional Warehouse",
      store: "Volt Vault",
      product: { name: "Amazon Echo Dot", img: AmazonEchoDot },
      date: "24 Jul 2023",
      person: { name: "Kevin", img: Kevin },
      qty: 140,
    },
  ];

  const warehouses = [
    "Lavish Warehouse",
    "Quaint Warehouse",
    "Traditional Warehouse",
    "Cool Warehouse",
    "Retail Supply Hub",
  ];

  const stores = [
    "Electro Mart",
    "Quantum Gadgets",
    "Prime Bazaar",
    "Gadget World",
    "Volt Vault",
  ];

  const products = [
    "Lenovo IdeaPad 3",
    "Beats Pro",
    "Nike Jordan",
    "Apple Series 5 Watch",
    "Amazon Echo Dot",
  ];

  const persons = [
    "James Kirwin",
    "Francis Chang",
    "Steven",
    "Gravely",
    "Kevin",
  ];

  const filteredData = dataSource.filter((item) =>
    item.product.name.toLowerCase().includes(searchText.toLowerCase())
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

  const warehouseMenu = (
    <Menu>
      {warehouses.map((w) => (
        <Menu.Item key={w}>{w}</Menu.Item>
      ))}
    </Menu>
  );

  const storeMenu = (
    <Menu>
      {stores.map((s) => (
        <Menu.Item key={s}>{s}</Menu.Item>
      ))}
    </Menu>
  );

  const productMenu = (
    <Menu>
      {products.map((p) => (
        <Menu.Item key={p}>{p}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Manage Stock</h2>
          <p className="text-gray-500 text-sm">Manage your stock</p>
        </div>

        <div className="flex items-center gap-2">
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
            className="bg-orange-500 border-none hover:bg-orange-600 shadow-md"
            onClick={handleOpenModal}
          >
            Add Stock
          </Button>
        </div>
      </div>

      {/* Top Controls */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          {/* Search Left */}
          <div className="flex-1 max-w-[180px]">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              className="w-full h-8 rounded-md text-sm px-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Dropdowns Right */}
          <div className="flex items-center gap-2">
            <Dropdown overlay={warehouseMenu} trigger={["click"]}>
              <Button className="bg-white border rounded-md hover:bg-gray-100 shadow-sm w-32 justify-between">
                <Space className="flex justify-between w-full">
                  Warehouse
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={storeMenu} trigger={["click"]}>
              <Button className="bg-white border rounded-md hover:bg-gray-100 shadow-sm w-28 justify-between">
                <Space className="flex justify-between w-full">
                  Store
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={productMenu} trigger={["click"]}>
              <Button className="bg-white border rounded-md hover:bg-gray-100 shadow-sm w-32 justify-between">
                <Space className="flex justify-between w-full">
                  Product
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

        {/* Pagination Footer */}
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

      {/* Add Stock Modal */}
      <Modal
        title={<span className="font-semibold text-lg">Add Stock</span>}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        closeIcon={<CloseOutlined className="text-red-500" />}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddStock}
          className="pt-2"
        >
          <Form.Item
            label={
              <span>
                Warehouse <span className="text-red-500">*</span>
              </span>
            }
            name="warehouse"
            rules={[{ required: true, message: "Please select warehouse" }]}
          >
            <Select placeholder="Select" options={warehouses.map((w) => ({ value: w, label: w }))} />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Store <span className="text-red-500">*</span>
              </span>
            }
            name="store"
            rules={[{ required: true, message: "Please select store" }]}
          >
            <Select placeholder="Select" options={stores.map((s) => ({ value: s, label: s }))} />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Responsible Person <span className="text-red-500">*</span>
              </span>
            }
            name="person"
            rules={[{ required: true, message: "Please select responsible person" }]}
          >
            <Select placeholder="Select" options={persons.map((p) => ({ value: p, label: p }))} />
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
              placeholder="Select Product"
              options={products.map((p) => ({ value: p, label: p }))}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={handleCloseModal} className="bg-[#0e2954] text-white">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-orange-500 border-none hover:bg-orange-600"
            >
              Add Stock
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageStock;
