'use client';

import { useState, useEffect } from 'react';

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'Pending' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Cancelled';
  cancelNote?: string;
}

const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customer: 'Nguyen Van A',
    phone: '0123456789',
    address: '123 Le Loi, Q1, HCMC',
    items: [
      { name: 'Áo thun', qty: 2, price: 120_000 },
      { name: 'Quần jean', qty: 1, price: 250_000 },
    ],
    total: 490_000,
    status: 'Pending',
  },
  {
    id: 'ORD002',
    customer: 'Tran Thi B',
    phone: '0987654321',
    address: '456 Nguyen Trai, Q5, HCMC',
    items: [
      { name: 'Giày thể thao', qty: 1, price: 500_000 },
      { name: 'Vớ', qty: 3, price: 45_000 },
    ],
    total: 635_000,
    status: 'Picked Up',
  },
];

const statusColors: Record<Order['status'], string> = {
  Pending: 'bg-gray-100 text-gray-800',
  'Picked Up': 'bg-blue-100 text-blue-800',
  'In Transit': 'bg-yellow-100 text-yellow-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export default function ShipperDashboard() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [filter, setFilter] = useState<Order['status'] | 'All'>('All');
  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    setOrders(initialOrders);
  }, []);

  const nextStatus = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'Picked Up';
      case 'Picked Up':
        return 'In Transit';
      case 'In Transit':
        return 'Delivered';
      default:
        return status;
    }
  };

  const handleStatusChange = (id: string) => {
    setOrders((prev) => {
      if (!prev) return null;
      return prev.map((o) =>
        o.id === id ? { ...o, status: nextStatus(o.status) } : o
      );
    });
  };

  const handleCancelClick = (id: string) => {
    setCurrentOrderId(id);
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    if (!currentOrderId) return;
    setOrders((prev) =>
      prev?.map((o) =>
        o.id === currentOrderId
          ? { ...o, status: 'Cancelled', cancelNote: note }
          : o
      ) || null
    );
    setNote('');
    setCurrentOrderId(null);
    setShowModal(false);
  };

  if (!orders) return <div>Loading...</div>;

  const filteredOrders =
    filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Shipper Dashboard</h1>

      {/* Filter */}
      <div className="mb-6 flex justify-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border rounded px-3 py-2 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="relative flex flex-col md:flex-row justify-between items-start md:items-start border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4"
          >
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-center shadow-md ${statusColors[order.status]}`}
            >
              {order.status}
            </span>
            <div className="flex-1 mb-4 md:mb-0 md:pr-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-800">Order:  #{order.id}</h2>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-semibold text-gray-800">Customer:</span> {order.customer}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Phone number:</span> {order.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Address:</span> {order.address}
                </p>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p className="font-semibold text-gray-800 mb-2">Products:</p>
                <ul className="list-disc list-inside space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      {item.name} <span className="text-gray-500">x{item.qty}</span> ({item.price.toLocaleString('vi-VN')} đ)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="font-bold text-lg text-gray-900">
                  Total: {order.total.toLocaleString('vi-VN')} đ
                </div>
              </div>
              {order.cancelNote && (
                <div className="mt-3 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span className="font-semibold">Reason for cancellation:</span> {order.cancelNote}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-end gap-3 md:ml-4 md:min-w-[160px] h-full min-h-[200px]">
              <div className="flex flex-col gap-3">
                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order.id)}
                      className={`py-2 px-4 rounded-lg font-semibold text-white cursor-pointer transition-colors duration-200 ${order.status === 'Pending'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : order.status === 'Picked Up'
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                      {order.status === 'Pending'
                        ? 'Accept Order'
                        : order.status === 'Picked Up'
                          ? 'In Transit'
                          : 'Delivered'}
                    </button>

                    {order.status === 'In Transit' && (
                      <button
                        onClick={() => handleCancelClick(order.id)}
                        className="py-2 px-4 rounded-lg font-semibold cursor-pointer text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                      >
                        Report Failed Delivery
                      </button>
                    )}
                  </>
                )}
                {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                  <span
                    className={`font-semibold text-sm py-2 px-4 rounded-lg text-center ${order.status === 'Delivered' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}
                  >
                    {order.status === 'Delivered' ? 'Delivered' : 'Cancelled'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Lý do giao hàng không thành công</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter reason..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
