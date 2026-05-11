import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/order"
      );
      setOrders(data.data);
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await axios.patch(
      `http://localhost:5000/api/order/${id}/status`,
      { status }
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      {orders.map((order: any) => (
        <div key={order._id} className="border p-3 mb-3">
          <p>Total: {order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>

          <button
            onClick={() => updateStatus(order._id, "processing")}
            className="bg-blue-500 text-white px-2 py-1 mr-2"
          >
            Processing
          </button>

          <button
            onClick={() => updateStatus(order._id, "completed")}
            className="bg-green-500 text-white px-2 py-1"
          >
            Complete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;