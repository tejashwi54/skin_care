import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/orderApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await getAllOrders();

      console.log("ADMIN ORDERS RESPONSE:", response);

      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      toast.success("Order status updated");

      loadOrders();
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-3xl font-bold">
          Manage Orders
        </h2>

        <p className="mt-5 text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <h2 className="text-3xl font-bold">
        Manage Orders
      </h2>

      <p className="mt-2 text-gray-500">
        View and manage all customer orders.
      </p>

      <div className="mt-8 space-y-6">
        {orders.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <p className="text-gray-500">
              No orders found.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">
                    Order #{order._id.slice(-6)}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Customer: {order.user?.name}
                  </p>

                  <p className="text-gray-500">
                    {order.user?.email}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Order Status
                  </label>

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-4 py-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">
                  Products
                </h4>

                <div className="space-y-2">
                  {order.orderItems?.map((item) => (
                    <div
                      key={item._id || item.product}
                      className="flex justify-between border-b py-2"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t mt-5 pt-5 flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>
                  ₹{order.totalPrice}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;