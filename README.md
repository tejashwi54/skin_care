# 🌿 Clear Skin - MERN Stack E-commerce Website

A modern and responsive **MERN Stack E-commerce Website** for skincare products. The application provides a complete online shopping experience with secure authentication, product browsing, wishlist, shopping cart, checkout, order management, and user dashboard.

This project was developed as part of an internship with a focus on **clean architecture, responsive UI, security, and user experience**.

---

# 🚀 Tech Stack

## Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- Framer Motion
- React Hot Toast
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Express Validator
- Helmet
- Morgan
- Cookie Parser
- CORS

---

# ✨ Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Logout
- Role-Based Authentication
- Input Validation

---

## Home Page

- Premium Responsive Landing Page
- Hero Banner
- Featured Products
- Categories
- Best Sellers
- New Arrivals
- Testimonials
- Newsletter Section

---

## Product Module

- Product Listing
- Product Details
- Category Filtering
- Responsive Product Cards

---

## Shopping Cart

- Add to Cart
- Remove from Cart
- Increase Quantity
- Decrease Quantity
- Dynamic Order Summary
- Shipping & Discount Calculation

---

## Wishlist

- Add to Wishlist
- Remove from Wishlist
- Move Product to Cart
- Dynamic Wishlist

---

## Checkout

- Billing Details Form
- Payment Method Selection
- Order Summary
- Place Order
- Order Success Page

---

## Orders

- Place Order
- My Orders
- View Order Details
- Cancel Order

---

## Dashboard

- User Profile
- Welcome Message with Logged-in User
- My Orders
- Logout

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Input Validation
- Protected APIs
- Environment Variables
- Helmet Security
- CORS Protection
- Centralized Error Handling

---

# 📂 Project Structure

```text
Clear_skin/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── helpers/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/tejashwi54/skin_care.git
```

---

## Install Frontend

```bash
cd client
npm install
npm run dev
```

---

## Install Backend

```bash
cd server
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173
```

---

# 📸 Application Modules

- Home
- Shop
- Product Details
- Wishlist
- Shopping Cart
- Checkout
- Order Success
- Login
- Register
- Dashboard
- My Orders
- Contact
- About

---

# 🛠 API Modules

### Authentication

- Register User
- Login User
- Logout User
- Get Current User

### Products

- Get All Products
- Get Product By ID

### Orders

- Place Order
- Get My Orders
- Get Order By ID
- Cancel Order
- Get All Orders (Admin)
- Update Order Status

---

# 📈 Future Improvements

- Admin Dashboard
- Razorpay / Stripe Payment Gateway
- Product Reviews & Ratings
- Forgot Password
- Email Verification
- Cloudinary Image Upload
- Inventory Management
- Product Search & Filters
- Order Tracking

---

# 📌 Project Status

✅ **Completed**

The project includes a complete MERN-based e-commerce workflow with authentication, shopping cart, wishlist, checkout, order management, and responsive user interface.

---

# 👨‍💻 Developer

**Tejashwi Bharti**

GitHub:
https://github.com/tejashwi54

---

# 📄 License

This project was developed for educational and internship purposes.