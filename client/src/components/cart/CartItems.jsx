import CartItem from "./CartItem";
// import EmptyCart from "./EmptyCart";

const CartItems = () => {

  const hasItems = true;

  if (!hasItems) {
    // return <EmptyCart />;
  }

  return (
    <div className="bg-white rounded-[32px] shadow-sm">

      <CartItem />
      <CartItem />

    </div>
  );
};

export default CartItems;