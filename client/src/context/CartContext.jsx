import { useAuth } from "./AuthContext";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addToCart as addCartItem,
  clearCart as clearPersistedCart,
  getCart,
  removeFromCart as removeCartItem,
  updateCartQuantity,
} from "../api/cartApi";

import { getId } from "../utils/getId";

const CartContext = createContext();

const GUEST_CART_KEY = "cart_guest";

// Get guest cart from localStorage
const getGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  // Load cart
  useEffect(() => {
    if (loading) return;

    const loadCart = async () => {
      // Guest user → load cart from localStorage
      if (!user) {
        setCartItems(getGuestCart());
        return;
      }

      // Logged-in user → load cart from backend
      try {
        const response = await getCart();

        setCartItems(response.data.items || []);
      } catch {
        setCartItems([]);
      }
    };

    loadCart();
  }, [user, loading]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem(
        GUEST_CART_KEY,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, user]);

  // Common helper for backend cart operations
  const syncCart = async (request) => {
    try {
      const response = await request;

      const updatedItems = response.data.items || [];

      setCartItems(updatedItems);

      return updatedItems;
    } catch {
      return null;
    }
  };

  // Add product to cart
  const addToCart = async (product, quantity = 1) => {
    if (user) {
      return syncCart(
        addCartItem(getId(product), quantity)
      );
    }

    // Guest user → localStorage cart
    setCartItems((previousItems) => {
      const existingProduct = previousItems.find(
        (item) => getId(item) === getId(product)
      );

      if (existingProduct) {
        return previousItems.map((item) =>
          getId(item) === getId(product)
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity,
        },
      ];
    });

    return null;
  };

  // Remove product from cart
  const removeFromCart = async (product) => {
    if (user) {
      return syncCart(
        removeCartItem(getId(product))
      );
    }

    // Guest user → local cart
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => getId(item) !== getId(product)
      )
    );

    return null;
  };

  // Update product quantity
  const updateQuantity = async (product, quantity) => {
    if (quantity < 1) {
      return removeFromCart(product);
    }

    if (user) {
      return syncCart(
        updateCartQuantity(
          getId(product),
          quantity
        )
      );
    }

    // Guest user → local cart
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        getId(item) === getId(product)
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );

    return null;
  };

  // Increase quantity
  const increaseQuantity = (product) => {
    return updateQuantity(
      product,
      product.quantity + 1
    );
  };

  // Decrease quantity
  const decreaseQuantity = (product) => {
    if (product.quantity === 1) {
      return removeFromCart(product);
    }

    return updateQuantity(
      product,
      product.quantity - 1
    );
  };

  // Clear cart
  const clearCart = async () => {
    if (user) {
      return syncCart(clearPersistedCart());
    }

    // Guest user → clear local cart
    setCartItems([]);

    return null;
  };

  // Total cart price
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // Total number of items
  const totalItems = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
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

export const useCart = () => {
  return useContext(CartContext);
};

