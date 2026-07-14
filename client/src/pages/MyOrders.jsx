import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getMyOrders } from "../api/orderApi";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <section className="py-20 min-h-screen bg-gray-50">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-10">
            My Orders
          </h1>

          {orders.length === 0 ? (

            <div className="bg-white rounded-3xl p-10 text-center shadow">

              <h2 className="text-2xl font-bold">
                No Orders Found
              </h2>

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
                        key={item.product}
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

      </section>
    </MainLayout>
  );
};

export default MyOrders;