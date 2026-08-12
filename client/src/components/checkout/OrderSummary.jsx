import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../api/orderApi";
import { getId } from "../../utils/getId";

const OrderSummary = ({
  billingData,
  paymentMethod,
}) => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    totalItems,
    clearCart,
  } = useCart();

  const shipping =
    cartTotal > 999 || cartTotal === 0 ? 0 : 99;

  const discount =
    cartTotal >= 2000 ? 200 : 0;

  const total =
    cartTotal + shipping - discount;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pinCode,
    } = billingData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pinCode
    ) {
      toast.error("Please fill all billing details");
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: getId(item),
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),

        shippingAddress: billingData,

        paymentMethod,

        itemsPrice: cartTotal,

        shippingPrice: shipping,

        discount,

        totalPrice: total,
      };

      await placeOrder(orderData);

      toast.success("Order placed successfully!");

      await clearCart();

      navigate("/order-success");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-lg p-8 sticky top-28">

      <h2 className="text-3xl font-bold mb-8">
        Order Summary
      </h2>

      <div className="space-y-5 max-h-72 overflow-y-auto">

        {cartItems.map((item) => (
          <div
            key={getId(item)}
            className="flex justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                Qty : {item.quantity}
              </p>
            </div>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

      </div>

      <hr className="my-8" />

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{cartTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0
              ? "Free"
              : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-10 bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold"
      >
        Place Order
      </button>

    </div>
  );
};

export default OrderSummary;
