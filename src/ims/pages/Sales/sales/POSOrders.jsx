import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Form,
  InputNumber,
  DatePicker,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  ExpandOutlined,
  MoreOutlined,
  UserOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { POSOrdersService } from './POSOrdersservice';
import dayjs from 'dayjs';

const { Option } = Select;

const POSOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    customer: null,
    status: null,
    paymentStatus: null,
    sortBy: 'Last 7 Days',
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setOrders([
        {
          key: '1',
          customer: 'Carl Evans',
          reference: 'SL001',
          date: '24 Dec 2024',
          status: 'Completed',
          grandTotal: 1000,
          paid: 1000,
          due: 0.0,
          paymentStatus: 'Paid',
          biller: 'Admin',
        },
        {
          key: '2',
          customer: 'Minerva Rameriz',
          reference: 'SL002',
          date: '10 Dec 2024',
          status: 'Pending',
          grandTotal: 1500,
          paid: 0.0,
          due: 1500,
          paymentStatus: 'Unpaid',
          biller: 'Admin',
        },
        {
          key: '3',
          customer: 'Robert Lamon',
          reference: 'SL003',
          date: '08 Feb 2023',
          status: 'Completed',
          grandTotal: 1500,
          paid: 0.0,
          due: 1500,
          paymentStatus: 'Paid',
          biller: 'Admin',
        },
        {
          key: '4',
          customer: 'Patricia Lewis',
          reference: 'SL004',
          date: '12 Feb 2023',
          status: 'Completed',
          grandTotal: 2000,
          paid: 1000,
          due: 1000,
          paymentStatus: 'Overdue',
          biller: 'Admin',
        },
      ]);

      setCustomers([
        { id: 1, name: 'Carl Evans' },
        { id: 2, name: 'Minerva Rameriz' },
        { id: 3, name: 'Robert Lamon' },
      ]);
      setSuppliers([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Supplier 1' },
      ]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleAddSales = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedProducts([]);
    setOrderTax(0);
    setDiscount(0);
    setShipping(0);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      handleModalClose();
      fetchOrders();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleAddProduct = (productCode) => {
    if (!productCode) return;
    const mockProduct = {
      key: Date.now(),
      productName: `Product ${productCode}`,
      qty: 1,
      purchasePrice: 100,
      discount: 0,
      tax: 0,
      taxAmount: 0,
      unitCost: 100,
      totalCost: 100,
    };
    setSelectedProducts([...selectedProducts, mockProduct]);
  };

  const handleDeleteProduct = (key) => {
    setSelectedProducts(selectedProducts.filter((item) => item.key !== key));
  };

  const handleProductChange = (key, field, value) => {
    const updatedProducts = selectedProducts.map((item) => {
      if (item.key === key) {
        const updated = { ...item, [field]: value };
        const subtotal = updated.purchasePrice * updated.qty;
        const discountAmount = (subtotal * updated.discount) / 100;
        const afterDiscount = subtotal - discountAmount;
        const taxAmount = (afterDiscount * updated.tax) / 100;
        updated.taxAmount = taxAmount;
        updated.unitCost =
          updated.purchasePrice - (updated.purchasePrice * updated.discount) / 100;
        updated.totalCost = afterDiscount + taxAmount;
        return updated;
      }
      return item;
    });
    setSelectedProducts(updatedProducts);
  };

  const calculateTotals = () => {
    const subtotal = selectedProducts.reduce(
      (sum, item) => sum + (item.totalCost || 0),
      0
    );
    const orderTaxAmount = (subtotal * orderTax) / 100;
    const discountAmount = (subtotal * discount) / 100;
    const grandTotal =
      subtotal + orderTaxAmount - discountAmount + parseFloat(shipping || 0);
    return { subtotal, orderTaxAmount, discountAmount, grandTotal };
  };

  const totals = calculateTotals();

  const productColumns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: 80,
      render: (value, record) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => handleProductChange(record.key, 'qty', val)}
          className="w-full"
        />
      ),
    },
    {
      title: 'Purchase Price($)',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      width: 130,
      render: (value, record) => (
        <InputNumber
          min={0}
          value={value}
          onChange={(val) => handleProductChange(record.key, 'purchasePrice', val)}
          className="w-full"
        />
      ),
    },
    {
      title: 'Discount(%)',
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
      render: (value, record) => (
        <InputNumber
          min={0}
          max={100}
          value={value}
          onChange={(val) => handleProductChange(record.key, 'discount', val)}
          className="w-full"
        />
      ),
    },
    {
      title: 'Tax(%)',
      dataIndex: 'tax',
      key: 'tax',
      width: 80,
      render: (value, record) => (
        <InputNumber
          min={0}
          max={100}
          value={value}
          onChange={(val) => handleProductChange(record.key, 'tax', val)}
          className="w-full"
        />
      ),
    },
    {
      title: 'Tax Amount($)',
      dataIndex: 'taxAmount',
      key: 'taxAmount',
      render: (value) => `$ ${value?.toFixed(2) || '0.00'}`,
      width: 120,
    },
    {
      title: 'Unit Cost($)',
      dataIndex: 'unitCost',
      key: 'unitCost',
      render: (value) => `$ ${value?.toFixed(2) || '0.00'}`,
      width: 100,
    },
    {
      title: 'Total Cost($)',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (value) => `$ ${value?.toFixed(2) || '0.00'}`,
      width: 120,
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteProduct(record.key)}
        />
      ),
    },
  ];

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar 
            icon={<UserOutlined />} 
            size={36}
            style={{ backgroundColor: '#e5e7eb', color: '#9ca3af' }}
          />
          <span style={{ fontWeight: 400, color: '#1f2937', fontSize: '14px' }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      render: (text) => <span style={{ color: '#1f2937', fontSize: '14px' }}>{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span style={{ color: '#1f2937', fontSize: '14px' }}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const styles = {
          completed: { backgroundColor: '#10b981', color: '#ffffff' },
          pending: { backgroundColor: '#06b6d4', color: '#ffffff' },
          cancelled: { backgroundColor: '#ef4444', color: '#ffffff' },
        };
        const style = styles[status.toLowerCase()] || styles.completed;
        return (
          <span
            style={{
              ...style,
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 500,
              display: 'inline-block',
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      render: (value) => <span style={{ color: '#1f2937', fontSize: '14px' }}>${value}</span>,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      render: (value) => <span style={{ color: '#1f2937', fontSize: '14px' }}>${value}</span>,
    },
    {
      title: 'Due',
      dataIndex: 'due',
      key: 'due',
      render: (value) => <span style={{ color: '#1f2937', fontSize: '14px' }}>${value.toFixed(2)}</span>,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        const styles = {
          paid: { 
            dotColor: '#10b981', 
            textColor: '#10b981',
            bgColor: '#ecfdf5'
          },
          unpaid: { 
            dotColor: '#ef4444', 
            textColor: '#ef4444',
            bgColor: '#fef2f2'
          },
          overdue: { 
            dotColor: '#f59e0b', 
            textColor: '#f59e0b',
            bgColor: '#fffbeb'
          },
        };
        const style = styles[status.toLowerCase()] || styles.paid;
        return (
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px',
            backgroundColor: style.bgColor,
            padding: '4px 10px',
            borderRadius: '20px'
          }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: style.dotColor,
                display: 'inline-block',
              }}
            />
            <span style={{ color: style.textColor, fontSize: '13px', fontWeight: 500 }}>
              {status}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Biller',
      dataIndex: 'biller',
      key: 'biller',
      render: (text) => <span style={{ color: '#1f2937', fontSize: '14px' }}>{text}</span>,
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view">View</Menu.Item>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="delete" danger>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button 
            type="text" 
            icon={<MoreOutlined style={{ fontSize: '18px', color: '#6b7280' }} />} 
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', margin: 0, marginBottom: '4px' }}>
            POS Orders
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Manage Your pos orders
          </p>
        </div>
        <Space size={12}>
          <Button
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilePdfOutlined style={{ fontSize: '16px', color: '#ffffff' }} />
          </Button>
          <Button
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileExcelOutlined style={{ fontSize: '16px', color: '#ffffff' }} />
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchOrders}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
            }}
          />
          <Button
            icon={<ExpandOutlined />}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
            }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddSales}
            style={{
              backgroundColor: '#ff6b35',
              borderColor: '#ff6b35',
              borderRadius: '6px',
              height: '36px',
              padding: '0 16px',
              fontWeight: 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
            }}
          >
            Add Sales
          </Button>
        </Space>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
      }}>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: 280,
            height: '40px',
            borderRadius: '8px',
            borderColor: '#e5e7eb',
          }}
        />
        <Space size={8}>
          <Select
            placeholder="Customer"
            style={{ width: 140, height: '40px' }}
            value={filters.customer}
            onChange={(value) => setFilters({ ...filters, customer: value })}
            allowClear
            bordered
          >
            {customers.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            style={{ width: 120, height: '40px' }}
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            allowClear
            bordered
          >
            <Option value="Completed">Completed</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
          <Select
            placeholder="Payment Status"
            style={{ width: 160, height: '40px' }}
            value={filters.paymentStatus}
            onChange={(value) => setFilters({ ...filters, paymentStatus: value })}
            allowClear
            bordered
          >
            <Option value="Paid">Paid</Option>
            <Option value="Unpaid">Unpaid</Option>
            <Option value="Overdue">Overdue</Option>
          </Select>
          <Select
            style={{ width: 180, height: '40px' }}
            value={filters.sortBy}
            onChange={(value) => setFilters({ ...filters, sortBy: value })}
            bordered
          >
            <Option value="Last 7 Days">Sort By : Last 7 Days</Option>
            <Option value="Last 30 Days">Sort By : Last 30 Days</Option>
            <Option value="Last 90 Days">Sort By : Last 90 Days</Option>
          </Select>
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{
          ...pagination,
          style: { marginTop: '16px' }
        }}
        onChange={handleTableChange}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        bordered={false}
        rowClassName={() => 'table-row'}
      />

      <style>{`
        .ant-table {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
        .ant-table-thead > tr > th {
          background-color: #ffffff !important;
          border-bottom: 1px solid #e5e7eb !important;
          color: '#374151 !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          padding: 16px !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f3f4f6 !important;
          padding: 16px !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .ant-select-selector {
          border-radius: 8px !important;
          border-color: #e5e7eb !important;
          height: 40px !important;
        }
        .ant-select-selection-search-input {
          height: 38px !important;
        }
        .ant-select-selection-item {
          line-height: 38px !important;
        }
        .ant-select-selection-placeholder {
          line-height: 38px !important;
        }
        .ant-input {
          border-radius: 8px !important;
        }
      `}</style>

      {/* Add Sales Modal */}
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: 600 }}>Add Sales</span>}
        open={isModalVisible}
        onCancel={handleModalClose}
        width={1000}
        footer={null}
        bodyStyle={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
        }}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <Form.Item
              name="customerId"
              label="Customer"
              rules={[{ required: true, message: 'Please select a customer' }]}
            >
              <Select placeholder="Select Customer">
                {customers.map((c) => (
                  <Option key={c.id}>{c.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Select a date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="supplierId"
              label="Supplier"
              rules={[{ required: true, message: 'Please select supplier' }]}
            >
              <Select placeholder="Select Supplier">
                {suppliers.map((s) => (
                  <Option key={s.id}>{s.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Product">
            <Input
              placeholder="Please type product code and select"
              onPressEnter={(e) => {
                handleAddProduct(e.target.value);
                e.target.value = '';
              }}
              suffix={<PlusOutlined />}
            />
          </Form.Item>

          <Table
            columns={productColumns}
            dataSource={selectedProducts}
            pagination={false}
            size="small"
            style={{ border: '1px solid #e5e7eb', marginBottom: '24px' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item label="Order Tax">
                <InputNumber min={0} max={100} value={orderTax} onChange={setOrderTax} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Discount">
                <InputNumber min={0} max={100} value={discount} onChange={setDiscount} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Shipping">
                <InputNumber min={0} value={shipping} onChange={setShipping} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Select status' }]}
              >
                <Select>
                  <Option value="Pending">Pending</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: '#f9fafb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Order Tax:</span>
                <span>$ {totals.orderTaxAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Discount:</span>
                <span>$ {totals.discountAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Shipping:</span>
                <span>$ {shipping.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '8px', paddingTop: '8px', fontWeight: 600, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Grand Total</span>
                <span>$ {totals.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <Button 
              onClick={handleModalClose}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 20px',
                height: 'auto',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="primary"
              style={{
                backgroundColor: '#ea580c',
                borderColor: '#ea580c',
                borderRadius: '6px',
                padding: '8px 20px',
                height: 'auto',
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

export default POSOrders;