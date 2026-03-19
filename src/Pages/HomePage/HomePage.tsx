import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold text-purple-600">1,245</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Revenue</h2>
          <p className="text-2xl font-bold text-green-600">$8,540</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Customers</h2>
          <p className="text-2xl font-bold text-blue-600">532</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>#1234</td>
                <td>Mamun</td>
                <td>$120</td>
                <td className="text-green-600">Completed</td>
              </tr>
              <tr className="border-b">
                <td>#1235</td>
                <td>Rahim</td>
                <td>$80</td>
                <td className="text-yellow-500">Pending</td>
              </tr>
              <tr>
                <td>#1236</td>
                <td>Karim</td>
                <td>$200</td>
                <td className="text-red-500">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-sm">
          <li>✅ New order placed by Rahim</li>
          <li>💰 Payment received from Mamun</li>
          <li>🚚 Order #1234 shipped</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;