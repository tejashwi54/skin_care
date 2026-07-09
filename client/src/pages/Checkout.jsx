import MainLayout from "../layouts/MainLayout";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import BillingForm from "../components/checkout/BillingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";

const Checkout = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          <CheckoutHeader />

          <div className="grid lg:grid-cols-[1.5fr_0.8fr] gap-10 mt-14">

            <div>
              <BillingForm />
              <PaymentMethod />
            </div>

            <OrderSummary />

          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Checkout;