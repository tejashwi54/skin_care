import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import SearchModal from "../common/SearchModal";

const Navbar = () => {
  const { cartItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Best Sellers", path: "/shop?type=bestseller" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white/90 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-green-600"
          >
            🌿 Clear Skin
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium transition ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-green-600 transition"
            >
              <FiSearch size={24} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hover:text-red-500 transition"
            >
              <FiHeart size={24} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:text-green-600 transition"
            >
              <FiShoppingCart size={24} />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className="hover:text-green-600 transition"
            >
              <FiUser size={24} />
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">

            <div className="flex flex-col p-6 gap-5">

              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-700"
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="flex items-center gap-6 pt-4">

                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  <FiSearch size={22} />
                </button>

                <Link
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiHeart size={22} />
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="relative"
                >
                  <FiShoppingCart size={22} />

                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUser size={22} />
                </Link>

              </div>

            </div>

          </div>
        )}
      </header>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;