import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import App from "./App";      // ✅ Ye line honi chahiye
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
// main.jsx

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
          }}
        />
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>
);