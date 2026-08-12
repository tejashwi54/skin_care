import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getMyOrders } from "../api/orderApi";

import { toast } from "react-hot-toast";

const MyOrders = () => {
  console.log("MyOrders component mounted");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("MyOrders useEffect running");

    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      console.log("Calling getMyOrders...");

      const response = await getMyOrders();

      console.log("My Orders API response:", response);

      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to load orders:", error);

      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-10">
            My Orders
          </h1>

          <div className="bg-white rounded-3xl p-10 text-center shadow">
            <p className="text-gray-500">
              Loading orders...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow p-8"
              >
                <div className="flex justify-between">
                  <h2 className="font-bold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <span className="text-green-600 font-semibold">
                    {order.orderStatus}
                  </span>
                </div>

                <div className="mt-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id || item.product}
                      className="flex justify-between py-2"
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

                <hr className="my-5" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>
                    ₹{order.totalPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyOrders;
