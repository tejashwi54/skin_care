import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import BillingForm from "../components/checkout/BillingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";

const Checkout = () => {
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          <CheckoutHeader />

          <div className="grid lg:grid-cols-[1.5fr_0.8fr] gap-10 mt-14">

            <div>

              <BillingForm
                billingData={billingData}
                setBillingData={setBillingData}
              />

              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

            </div>

            <OrderSummary
              billingData={billingData}
              paymentMethod={paymentMethod}
            />

          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Checkout;