const orders = [
  {
    id: 1,
    product: "Product A",
    totalOrder: 3,
    condition: "Waiting for confirmation",
    countdown: "2d 3h",
    shippingUnit: "aaaaaaaaaaaaa",
  },
  {
    id: 2,
    product: "Product B",
    totalOrder: 1,
    condition: "Delivering",
    countdown: "1d 5h",
    shippingUnit: "b",
  },
  {
    id: 3,
    product: "Product C",
    totalOrder: 2,
    condition: "Delivered",
    countdown: "-",
    shippingUnit: "c",
  },
];

type OrderTableProps = {
  activeTab: string;
  shippingUnit: string;
};

export default function OrderTable({
  activeTab,
  shippingUnit,
}: OrderTableProps) {
  const filteredOrders = orders.filter((order) => {
    const matchTab = activeTab === "All" || order.condition === activeTab;
    const matchShipping =
      shippingUnit === "All" || order.shippingUnit === shippingUnit;
    return matchTab && matchShipping;
  });

  return (
    <div className="border rounded overflow-hidden mt-4">
      <div className="grid grid-cols-6 bg-gray-100 p-2 text-sm font-semibold text-gray-700">
        <div>Sản phẩm</div>
        <div>Tổng đơn</div>
        <div>Trạng thái</div>
        <div>Đếm ngược</div>
        <div>Đơn vị vận chuyển</div>
        <div>Thao tác</div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          <svg
            className="mx-auto mb-2 w-10 h-10 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m2 0a2 2 0 100-4h-2a2 2 0 00-2-2H9a2 2 0 000 4h2a2 2 0 012 2z"
            />
          </svg>
          0 Đơn hàng
        </div>
      ) : (
        filteredOrders.map((order, index) => (
          <div
            key={order.id}
            className={`grid grid-cols-6 p-2 text-sm ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } border-t`}
          >
            <div>{order.product}</div>
            <div>{order.totalOrder}</div>
            <div>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  order.condition === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.condition === "Delivering"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.condition}
              </span>
            </div>
            <div>{order.countdown}</div>
            <div className="truncate">{order.shippingUnit}</div>
            <div>
              <button className="text-blue-600 hover:underline flex items-center gap-1">
                Xem
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
