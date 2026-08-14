# 🌿 Clear Skin — MERN Stack E-commerce Website

Clear Skin is a modern and responsive **MERN Stack e-commerce platform** for skincare products. It provides a complete shopping experience with secure authentication, product browsing, wishlist, cart, checkout, order management, and admin operations.

The project was developed as part of an internship with a focus on **clean architecture, security, validation, and responsive user experience**.

---

## 🚀 Tech Stack

### Frontend
- React.js + Vite
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- Framer Motion
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Express Validator
- Helmet
- CORS
- Cookie Parser
- Morgan
- CSRF Protection
- Nodemailer + Brevo SMTP
- Swagger / OpenAPI
- Jest + Supertest

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- Email Verification using OTP
- Resend Verification OTP
- Forgot Password
- Password Reset using OTP
- JWT Authentication
- Secure `httpOnly` Cookie Authentication
- Protected Routes
- Role-Based Access Control (RBAC)
- Admin Authorization
- Logout
- Rate Limiting
- Input Validation

### 🛍️ Products
- Product Listing & Details
- Search
- Category Filtering
- Price Filtering
- Sorting
- Pagination
- Featured Products
- Best Sellers
- Product CRUD for Admin
- Product Validation

### 🛒 Cart & Wishlist
- Add / Remove Products
- Increase / Decrease Quantity
- Persistent Database Cart for Logged-in Users
- Guest Cart using localStorage
- Wishlist Management
- Move Wishlist Products to Cart

### 📦 Orders & Checkout
- Shipping Address
- Payment Method Selection
- Order Placement
- Order Summary
- My Orders
- Order Details
- Order Cancellation
- Admin Order Management
- Order Status Updates
- Best-Selling Products

### 👨‍💼 Admin
- Product Management
- Order Management
- Update Order Status
- View All Orders
- Best-Selling Products
- Featured Product Management

---

## 🔒 Security

- JWT authentication with `httpOnly` cookies
- bcrypt password hashing
- CSRF protection
- Helmet security headers
- CORS configuration
- Authentication rate limiting
- Express Validator
- MongoDB schema validation
- Role-Based Access Control
- Centralized error handling
- Environment-based configuration

---

## 🧱 Backend Architecture

The backend follows a layered architecture:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Models
  ↓
MongoDB


📚 API Documentation

Swagger / OpenAPI documentation is available for the backend.

After starting the server:

http://localhost:5000/api/docs

Main API modules:

Authentication
Products
Cart
Orders
Dashboard
Health Check
🧪 Testing

Automated testing is implemented using Jest and Supertest.

Current test status:

Test Suites: 2 passed
Tests:       17 passed

Run tests:

cd server
npm test -- --runInBand


📂 Project Structure
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
├── server/
│   ├── config/
│   ├── controllers/
│   ├── helpers/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── seeder/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── README.md
└── .gitignore

⚙️ Installation
1. Clone Repository
git clone https://github.com/tejashwi54/skin_care.git
cd skin_care
2. Frontend
cd client
npm install
npm run dev

Frontend:

http://localhost:5173
3. Backend

Open another terminal:

cd server
npm install
npm run dev

Backend:

http://localhost:5000


🔐 Environment Variables

Create a .env file inside the server directory:

PORT=5000


MONGO_URI=YOUR_MONGODB_URI


JWT_SECRET=YOUR_JWT_SECRET


CLIENT_URL=http://localhost:5173


CSRF_SECRET=YOUR_CSRF_SECRET


BREVO_SMTP_HOST=YOUR_BREVO_SMTP_HOST
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=YOUR_BREVO_SMTP_USER
BREVO_SMTP_PASSWORD=YOUR_BREVO_SMTP_PASSWORD


BREVO_FROM_EMAIL=YOUR_VERIFIED_EMAIL
BREVO_FROM_NAME=Clear Skin

Never commit .env or any file containing secrets to GitHub.

🚧 Future Improvements
Login-time Two-Factor Authentication (2FA)
Refresh Token Rotation
Razorpay / Stripe Payment Gateway
Redis Caching
Image Optimization
Integration & E2E Testing
Error Monitoring with Sentry
Real-time Order Tracking
Product Reviews & Ratings
Advanced Analytics

📌 Project Status

Core e-commerce application completed.

The project currently includes secure authentication, email verification, password reset, RBAC, product management, persistent cart, wishlist, checkout, order management, admin operations, API validation, CSRF protection, Swagger documentation, automated testing, and responsive UI.

👨‍💻 Developer

Tejashwi Bharti

GitHub:
https://github.com/tejashwi54

📄 License

This project was developed for educational and internship purposes.
