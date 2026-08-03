import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart as addCartApi,
  updateCartQuantity,
  removeFromCart as removeCartApi,
  clearCart as clearCartApi,
} from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Fetch Cart
  // ===========================
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Fetch Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ===========================
  // Add To Cart
  // ===========================
  const addToCart = async (product) => {
    try {
      const response = await addCartApi(
        product._id,
        1
      );

      setCartItems(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Remove Item
  // ===========================
  const removeFromCart = async (id) => {
    try {
      const response =
        await removeCartApi(id);

      setCartItems(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Increase Quantity
  // ===========================
  const increaseQuantity = async (id) => {

    const item = cartItems.find(
      (item) => item._id === id
    );

    if (!item) return;

    try {

      const response =
        await updateCartQuantity(
          id,
          item.quantity + 1
        );

      setCartItems(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Decrease Quantity
  // ===========================
  const decreaseQuantity = async (id) => {

    const item = cartItems.find(
      (item) => item._id === id
    );

    if (!item) return;

    if (item.quantity === 1) {
      return removeFromCart(id);
    }

    try {

      const response =
        await updateCartQuantity(
          id,
          item.quantity - 1
        );

      setCartItems(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Clear Cart
  // ===========================
  const clearCart = async () => {

    try {

      await clearCartApi();

      setCartItems([]);

    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Cart Total
  // ===========================
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // ===========================
  // Total Items
  // ===========================
  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        fetchCart,
        cartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);