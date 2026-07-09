import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const CartItems = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-white rounded-[32px] shadow-sm p-6">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default CartItems;