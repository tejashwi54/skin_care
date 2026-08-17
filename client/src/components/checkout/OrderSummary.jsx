import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";

import { placeOrder } from "../../api/orderApi";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../api/paymentApi";

import { getId } from "../../utils/getId";

// ==============================
// Razorpay Script Loader
// ==============================

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => resolve(true)
      );

      existingScript.addEventListener(
        "error",
        () => resolve(false)
      );

      return;
    }

    const script = document.createElement(
      "script"
    );

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

// ==============================
// Component
// ==============================

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

  const [isProcessing, setIsProcessing] =
    useState(false);

  // ==============================
  // Pricing
  // ==============================

  const shipping =
    cartTotal > 999 || cartTotal === 0
      ? 0
      : 99;

  const discount =
    cartTotal >= 2000
      ? 200
      : 0;

  const total =
    cartTotal +
    shipping -
    discount;

  // ==============================
  // Handle Razorpay Payment
  // ==============================

  const handleOnlinePayment = async (
    orderId
  ) => {
    // Load Razorpay checkout script
    const razorpayLoaded =
      await loadRazorpayScript();

    if (!razorpayLoaded) {
      throw new Error(
        "Unable to load Razorpay. Please check your internet connection and try again."
      );
    }

    // Create Razorpay order from backend
    const paymentResponse =
      await createPaymentOrder(
        orderId
      );

    const paymentData =
      paymentResponse?.data;

    if (!paymentData) {
      throw new Error(
        "Invalid payment order response"
      );
    }

    // ==============================
    // Razorpay Checkout Options
    // ==============================

    const options = {
      key: paymentData.keyId,

      amount:
        paymentData.amount,

      currency:
        paymentData.currency || "INR",

      name: "Clear Skin",

      description:
        "Clear Skin Order Payment",

      order_id:
        paymentData.razorpayOrderId,

      prefill: {
        name:
          `${billingData.firstName} ${billingData.lastName}`.trim(),

        email:
          billingData.email,

        contact:
          billingData.phone,
      },

      notes: {
        orderId:
          orderId.toString(),
      },

      theme: {
        color: "#22c55e",
      },

      handler: async function (
        razorpayResponse
      ) {
        try {
          // ==============================
          // Verify Payment On Backend
          // ==============================

          await verifyPayment({
            orderId,

            razorpayOrderId:
              razorpayResponse.razorpay_order_id,

            razorpayPaymentId:
              razorpayResponse.razorpay_payment_id,

            razorpaySignature:
              razorpayResponse.razorpay_signature,
          });

          // Payment successfully verified
          await clearCart();

          toast.success(
            "Payment successful! Order confirmed."
          );

          navigate(
            "/order-success"
          );
        } catch (error) {
          console.error(
            "Payment verification error:",
            error
          );

          toast.error(
            error.response?.data?.message ||
              "Payment verification failed. Please contact support."
          );
        } finally {
          setIsProcessing(false);
        }
      },

      modal: {
        ondismiss: function () {
          setIsProcessing(false);

          toast.error(
            "Payment cancelled. Your cart has not been cleared."
          );
        },
      },
    };

    // ==============================
    // Open Razorpay
    // ==============================

    const razorpay =
      new window.Razorpay(options);

    razorpay.on(
      "payment.failed",
      function (response) {
        console.error(
          "Razorpay payment failed:",
          response.error
        );

        setIsProcessing(false);

        toast.error(
          response.error?.description ||
            "Payment failed. Please try again."
        );
      }
    );

    razorpay.open();
  };

  // ==============================
  // Place Order
  // ==============================

  const handlePlaceOrder =
    async () => {
      if (isProcessing) {
        return;
      }

      // ==============================
      // Cart Validation
      // ==============================

      if (
        cartItems.length === 0
      ) {
        toast.error(
          "Your cart is empty"
        );

        return;
      }

      // ==============================
      // Billing Validation
      // ==============================

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
        toast.error(
          "Please fill all billing details"
        );

        return;
      }

      try {
        setIsProcessing(true);

        // ==============================
        // Prepare Order Data
        // ==============================

        const orderData = {
          orderItems:
            cartItems.map(
              (item) => ({
                product:
                  getId(item),

                name:
                  item.name,

                image:
                  item.image,

                quantity:
                  item.quantity,

                price:
                  item.price,
              })
            ),

          shippingAddress:
            billingData,

          paymentMethod,

          // These values are sent for
          // compatibility, but the backend
          // recalculates them securely.
          itemsPrice:
            cartTotal,

          shippingPrice:
            shipping,

          discount,

          totalPrice:
            total,
        };

        // ==============================
        // Create MongoDB Order
        // ==============================

        const orderResponse =
          await placeOrder(
            orderData
          );

        const createdOrder =
          orderResponse?.data;

        if (!createdOrder?._id) {
          throw new Error(
            "Order was created but order ID was not returned."
          );
        }

        const orderId =
          createdOrder._id;

        // ==============================
        // COD
        // ==============================

        if (
          paymentMethod === "COD"
        ) {
          await clearCart();

          toast.success(
            "Order placed successfully!"
          );

          navigate(
            "/order-success"
          );

          return;
        }

        // ==============================
        // CARD / UPI
        // ==============================

        await handleOnlinePayment(
          orderId
        );
      } catch (error) {
        console.error(
          "Place order error:",
          error
        );

        setIsProcessing(false);

        toast.error(
          error.response?.data
            ?.message ||
            error.message ||
            "Failed to place order"
        );
      }
    };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="bg-white rounded-[32px] shadow-lg p-8 sticky top-28">

      <h2 className="text-3xl font-bold mb-8">
        Order Summary
      </h2>

      {/* Cart Items */}

      <div className="space-y-5 max-h-72 overflow-y-auto">

        {cartItems.map(
          (item) => (
            <div
              key={getId(item)}
              className="flex justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Qty :{" "}
                  {item.quantity}
                </p>
              </div>

              <span>
                ₹
                {item.price *
                  item.quantity}
              </span>
            </div>
          )
        )}

      </div>

      <hr className="my-8" />

      {/* Pricing */}

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>
            Total Items
          </span>

          <span>
            {totalItems}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Subtotal
          </span>

          <span>
            ₹{cartTotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Shipping
          </span>

          <span>
            {shipping === 0
              ? "Free"
              : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Discount
          </span>

          <span>
            -₹{discount}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>
            Total
          </span>

          <span>
            ₹{total}
          </span>
        </div>

      </div>

      {/* Place Order Button */}

      <button
        type="button"
        onClick={
          handlePlaceOrder
        }
        disabled={isProcessing}
        className="w-full mt-10 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold transition"
      >
        {isProcessing
          ? paymentMethod ===
            "COD"
            ? "Placing Order..."
            : "Processing Payment..."
          : paymentMethod ===
            "COD"
          ? "Place Order"
          : "Pay Now"}
      </button>

    </div>
  );
};

export default OrderSummary;