import {
  createContext,
  useContext,
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

  // ===========================
  // Add To Cart
  // ===========================
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
  };

  // ===========================
  // Remove Item
  // ===========================
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

  // ===========================
  // Increase Quantity
  // ===========================
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
  };

  // ===========================
  // Decrease Quantity
  // ===========================
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
  };

  // ===========================
  // Clear Cart
  // ===========================
  const clearCart = () => {
    setCartItems([]);
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
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
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