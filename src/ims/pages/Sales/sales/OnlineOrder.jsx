import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  FileText,
  FileSpreadsheet,
  RotateCw,
  Maximize2,
} from 'lucide-react';

const OnlineOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const avatarImages = {
    'Carl Evans': 'https://i.pravatar.cc/150?img=12',
    'Minerva Rameriz': 'https://i.pravatar.cc/150?img=47',
    'Robert Lamon': 'https://i.pravatar.cc/150?img=13',
    'Patricia Lewis': 'https://i.pravatar.cc/150?img=45',
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setTimeout(() => {
      setOrders([
        {
          id: '1',
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
          id: '2',
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
          id: '3',
          customer: 'Robert Lamon',
          reference: 'SL003',
          date: '08 Feb 2023',
          status: 'Completed',
          grandTotal: 1500,
          paid: 1500,
          due: 0.0,
          paymentStatus: 'Paid',
          biller: 'Admin',
        },
        {
          id: '4',
          customer: 'Patricia Lewis',
          reference: 'SL004',
          date: '15 Nov 2024',
          status: 'Completed',
          grandTotal: 2000,
          paid: 2000,
          due: 0.0,
          paymentStatus: 'Paid',
          biller: 'Admin',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#10b981';
    if (status === 'Pending') return '#06b6d4';
    return '#fbbf24';
  };

  // ✅ Updated: Payment status color and tag design (same as Invoices)
  const getPaymentTag = (status) => {
    const styles = {
      Paid: {
        background: '#E8F8F0',
        color: '#28C76F',
        dot: '#28C76F',
      },
      Unpaid: {
        background: '#FEE9E7',
        color: '#EA5455',
        dot: '#EA5455',
      },
      Pending: {
        background: '#FFF4E5',
        color: '#FF9F43',
        dot: '#FF9F43',
      },
    };

    const style = styles[status] || styles.Paid;
    return (
      <span
        className="text-xs font-medium flex items-center gap-1 px-2 py-1 rounded"
        style={{ backgroundColor: style.background, color: style.color }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: style.dot }}
        />
        {status}
      </span>
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(orders.map((o) => o.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-full mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Online Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Manage Your Online Orders</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
              <FileText className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors">
              <FileSpreadsheet className="w-5 h-5" />
            </button>
            <button
              onClick={fetchOrders}
              className="w-10 h-10 rounded-lg bg-gray-500 flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-500 flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="px-5 h-10 rounded-lg bg-orange-500 flex items-center gap-2 text-white font-medium hover:bg-orange-600 transition-colors">
              <Plus className="w-5 h-5" />
              Add Order
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length > 0 &&
                        selectedRows.length === orders.length
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 accent-orange-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Grand Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Due
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Biller
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-6 text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(order.id)}
                          onChange={() => handleSelectRow(order.id)}
                          className="w-4 h-4 accent-orange-500"
                        />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatarImages[order.customer]}
                            alt={order.customer}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {order.customer}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.reference}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.date}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-md text-xs font-semibold text-white inline-block"
                          style={{
                            backgroundColor: getStatusColor(order.status),
                          }}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{order.grandTotal}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{order.paid.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{order.due.toFixed(2)}
                      </td>

                      {/* ✅ Updated Payment Status */}
                      <td className="px-6 py-4">{getPaymentTag(order.paymentStatus)}</td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.biller}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrders;
