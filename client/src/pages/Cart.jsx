import MainLayout from "../layouts/MainLayout";

import CartHeader from "../components/cart/CartHeader";
import CartItems from "../components/cart/CartItems";
import OrderSummary from "../components/cart/OrderSummary";

const Cart = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-6">

          <CartHeader />

          <div className="grid lg:grid-cols-[1.8fr_0.8fr] gap-10 mt-14">

            {/* Left */}
            <CartItems />

            {/* Right */}
            <OrderSummary />

          </div>

        </div>

      </section>
    </MainLayout>
  );
};

export default Cart;