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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { name: "Categories", path: "/categories" },
    { name: "Best Sellers", path: "/best-sellers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-green-600 hover:scale-105 transition duration-300"
        >
          🌿 Clear Skin
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">

          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium transition duration-300
                ${
                  isActive
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }
                after:absolute after:left-0 after:-bottom-2
                after:h-[2px] after:bg-green-500
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </nav>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-6 text-2xl">

          <FiSearch className="cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300" />

          <FiHeart className="cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300" />

          <FiShoppingCart className="cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300" />

          <FiUser className="cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300" />

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
        <div className="lg:hidden bg-white shadow-lg px-6 py-5">

          <div className="flex flex-col gap-5">

            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-600"
                }
              >
                {item.name}
              </NavLink>
            ))}

          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;