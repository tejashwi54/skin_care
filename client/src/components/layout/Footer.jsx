import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-10 border-t border-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                C
              </div>

              <div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Clear Skin
                </h2>

                <p className="text-sm tracking-[4px] uppercase text-gray-400">
                  Healthy • Glow
                </p>

              </div>

            </div>

            <p className="mt-8 text-gray-500 leading-8">
              Clean ingredients, dermatologist-tested formulas,
              and skincare rituals designed for healthy,
              glowing skin.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition"
              >
                <FaTwitter />
              </a>

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="text-xl font-bold tracking-[2px] mb-8">
              SHOP
            </h3>

            <ul className="space-y-5 text-gray-500">

              <li className="hover:text-green-600 cursor-pointer">
                All Products
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Best Sellers
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                New Arrivals
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Sale
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="text-xl font-bold tracking-[2px] mb-8">
              SUPPORT
            </h3>

            <ul className="space-y-5 text-gray-500">

              <li className="hover:text-green-600 cursor-pointer">
                Contact
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Shipping
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Returns
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                FAQ
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold tracking-[2px] mb-8">
              COMPANY
            </h3>

            <ul className="space-y-5 text-gray-500">

              <li className="hover:text-green-600 cursor-pointer">
                About
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Ingredients
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Terms
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">
            © 2026 Clear Skin. All rights reserved.
          </p>

          <p className="text-gray-400 mt-4 md:mt-0">
            Made with care • Cruelty Free • Vegan
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;