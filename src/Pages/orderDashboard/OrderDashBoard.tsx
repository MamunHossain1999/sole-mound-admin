
import { FiShoppingCart } from "react-icons/fi";

const OrderDashBoard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
          <p className="text-gray-500 text-sm mt-1">
            Dashboard &gt; Order Details
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600 transition">
            Create Order +
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100 transition flex items-center gap-1">
            Export <span>⬇️</span>
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100 transition flex items-center gap-1">
            Export <span>⬇️</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiShoppingCart className="text-purple-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">This Week</p>
              <div className="flex gap-4 mt-1 text-gray-700">
                <span>All Orders: 0</span>
                <span>Pending: 0</span>
                <span>Completed: 0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiShoppingCart className="text-purple-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">This Week</p>
              <div className="flex gap-4 mt-1 text-gray-700">
                <span>Canceled: 0</span>
                <span>Returned: 0</span>
                <span>Damaged: 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No Orders */}
      <div className="flex justify-center items-center mt-20">
        <div className="bg-purple-50 p-10 rounded-lg shadow-lg text-center">
          <div className="bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
            <FiShoppingCart className="text-purple-500 w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">No Orders Yet?</h2>
          <p className="text-gray-500 mb-4">
            Add products to your store and start selling to see orders here.
          </p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600 transition">
            Add New Products +
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDashBoard;