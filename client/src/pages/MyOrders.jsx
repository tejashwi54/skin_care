import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import MainLayout from "../layouts/MainLayout";
import { getMyOrders } from "../api/orderApi";
import { toast } from "react-hot-toast";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "http://localhost:5000";

// ==============================
// Order Tracking Steps
// ==============================

const ORDER_STEPS = [
  {
    status: "Pending",
    title: "Order Placed",
    description: "Your order has been placed successfully.",
  },
  {
    status: "Confirmed",
    title: "Order Confirmed",
    description: "Your order has been confirmed.",
  },
  {
    status: "Shipped",
    title: "Order Shipped",
    description: "Your order has been shipped.",
  },
  {
    status: "Delivered",
    title: "Order Delivered",
    description: "Your order has been delivered.",
  },
];

// ==============================
// Get Current Step
// ==============================

const getStatusIndex = (status) => {
  return ORDER_STEPS.findIndex(
    (step) => step.status === status
  );
};

// ==============================
// Order Tracking Component
// ==============================

const OrderTracking = ({ order }) => {
  const currentStep = getStatusIndex(
    order.orderStatus
  );

  const isCancelled =
    order.orderStatus === "Cancelled";

  if (isCancelled) {
    return (
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-bold mb-5">
          Order Tracking
        </h3>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="font-semibold text-red-600">
            Order Cancelled
          </p>

          <p className="text-sm text-gray-600 mt-1">
            This order has been cancelled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-bold mb-6">
        Order Tracking
      </h3>

      <div className="space-y-6">
        {ORDER_STEPS.map((step, index) => {
          const completed =
            index <= currentStep;

          const isCurrent =
            index === currentStep;

          return (
            <div
              key={step.status}
              className="flex items-start gap-4"
            >
              {/* Status Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                    completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                {/* Connecting Line */}
                {index <
                  ORDER_STEPS.length - 1 && (
                  <div
                    className={`w-0.5 h-10 mt-1 ${
                      index < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>

              {/* Step Details */}
              <div className="pt-1">
                <p
                  className={`font-semibold ${
                    completed
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {step.description}
                </p>

                {isCurrent && (
                  <span className="inline-block mt-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Current Status
                  </span>
                )}

                {step.status === "Delivered" &&
                  order.deliveredAt && (
                    <p className="text-xs text-gray-400 mt-2">
                      Delivered on{" "}
                      {new Date(
                        order.deliveredAt
                      ).toLocaleDateString()}
                    </p>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==============================
// My Orders
// ==============================

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // Load Orders
  // ==============================

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);

        const response = await getMyOrders();

        console.log(
          "MY ORDERS RESPONSE:",
          response
        );

        setOrders(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error
        );

        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // ==============================
  // Real-Time Order Tracking
  // ==============================

  useEffect(() => {
    if (orders.length === 0) {
      return;
    }

    console.log(
      "Starting order tracking socket..."
    );

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log(
        "Order tracking socket connected:",
        socket.id
      );

      // Join room for every user's order
      orders.forEach((order) => {
        socket.emit(
          "join-order",
          order._id
        );
      });
    });

    // ==============================
    // Real-Time Status Update
    // ==============================

    socket.on(
      "order-status-updated",
      (updatedOrder) => {
        console.log(
          "Real-time order update:",
          updatedOrder
        );

        setOrders((currentOrders) =>
          currentOrders.map((order) => {
            if (
              order._id.toString() ===
              updatedOrder.orderId.toString()
            ) {
              return {
                ...order,
                orderStatus:
                  updatedOrder.status,
                deliveredAt:
                  updatedOrder.deliveredAt ||
                  null,
                updatedAt:
                  updatedOrder.updatedAt,
              };
            }

            return order;
          })
        );

        toast.success(
          `Order status updated to ${updatedOrder.status}`
        );
      }
    );

    // ==============================
    // Unauthorized Order
    // ==============================

    socket.on(
      "order-access-denied",
      (data) => {
        console.warn(
          "Order tracking access denied:",
          data
        );
      }
    );

    // ==============================
    // Socket Error
    // ==============================

    socket.on(
      "connect_error",
      (error) => {
        console.error(
          "Order tracking socket error:",
          error.message
        );
      }
    );

    // ==============================
    // Disconnect
    // ==============================

    socket.on("disconnect", () => {
      console.log(
        "Order tracking socket disconnected"
      );
    });

    // ==============================
    // Cleanup
    // ==============================

    return () => {
      orders.forEach((order) => {
        socket.emit(
          "leave-order",
          order._id
        );
      });

      socket.disconnect();

      console.log(
        "Order tracking socket cleaned up"
      );
    };
  }, [orders.length]);

  // ==============================
  // Loading State
  // ==============================

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

  // ==============================
  // Orders UI
  // ==============================

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
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
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow p-8"
              >
                {/* ============================== */}
                {/* Order Header */}
                {/* ============================== */}

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <h2 className="text-xl font-bold">
                    Order #
                    {order._id.slice(-6)}
                  </h2>

                  <span
                    className={`font-semibold ${
                      order.orderStatus ===
                      "Cancelled"
                        ? "text-red-600"
                        : order.orderStatus ===
                          "Delivered"
                        ? "text-green-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* ============================== */}
                {/* Products */}
                {/* ============================== */}

                <div className="mt-6">
                  {order.orderItems?.map(
                    (item) => (
                      <div
                        key={
                          item._id ||
                          item.product
                        }
                        className="flex justify-between py-3"
                      >
                        <span>
                          {item.name} ×{" "}
                          {item.quantity}
                        </span>

                        <span>
                          ₹
                          {item.price *
                            item.quantity}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <hr className="my-5" />

                {/* ============================== */}
                {/* Total */}
                {/* ============================== */}

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>
                    ₹{order.totalPrice}
                  </span>
                </div>

                {/* ============================== */}
                {/* Order Tracking */}
                {/* ============================== */}

                <OrderTracking order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyOrders;