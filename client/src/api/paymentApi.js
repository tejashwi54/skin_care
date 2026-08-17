import axiosInstance from "./axiosInstance";

// ==============================
// Create Razorpay Payment Order
// ==============================

export const createPaymentOrder = async (orderId) => {
  const response = await axiosInstance.post(
    "/payments/create-order",
    {
      orderId,
    }
  );

  return response.data;
};

// ==============================
// Verify Razorpay Payment
// ==============================

export const verifyPayment = async (paymentData) => {
  const response = await axiosInstance.post(
    "/payments/verify",
    paymentData
  );

  return response.data;
};