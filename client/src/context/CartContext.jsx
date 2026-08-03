import {
  createContext,
  useContext,
<<<<<<< HEAD
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
=======
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load Cart From LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const cartKey = user ? `cart_${user._id}` : "cart_guest";

    const savedCart = localStorage.getItem(cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save Cart To LocalStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

const cartKey = user ? `cart_${user._id}` : "cart_guest";

localStorage.setItem(
  cartKey,
  JSON.stringify(cartItems)
);
  }, [cartItems]);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  // ===========================
  // Add To Cart
  // ===========================
<<<<<<< HEAD
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
=======
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  };

  // ===========================
  // Remove Item
  // ===========================
<<<<<<< HEAD
  const removeFromCart = async (id) => {
    try {
      const response =
        await removeCartApi(id);

      setCartItems(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };
=======
  const removeFromCart = (id) => {
  console.log("Remove ID:", id);

  setCartItems((prevItems) => {
    console.log("Before:", prevItems);

    const updated = prevItems.filter(
      (item) => item._id !== id
    );

    console.log("After:", updated);

    return updated;
  });
};
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  // ===========================
  // Increase Quantity
  // ===========================
<<<<<<< HEAD
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
=======
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  };

  // ===========================
  // Decrease Quantity
  // ===========================
<<<<<<< HEAD
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
=======
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  };

  // ===========================
  // Clear Cart
  // ===========================
<<<<<<< HEAD
  const clearCart = async () => {

    try {

      await clearCartApi();

      setCartItems([]);

    } catch (error) {
      console.error(error);
    }
=======
  const clearCart = () => {
    setCartItems([]);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
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
<<<<<<< HEAD
        loading,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
<<<<<<< HEAD
        fetchCart,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
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