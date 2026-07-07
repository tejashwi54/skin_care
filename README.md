# 🌿 Clear Skin - MERN Stack E-commerce Website

A modern and responsive skincare e-commerce website built using the **MERN Stack**. This project is being developed as part of an internship assignment with a strong focus on **UI/UX, security, performance, and clean code architecture**.

---

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Framer Motion
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Cookie Parser
- Express Validator
- Express Rate Limit

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Encryption (bcrypt)
- Secure httpOnly Cookies
- Logout Functionality
- Current User API
- Input Validation
- Rate Limiting
- Role-Based Access Control (RBAC)
- Protected Routes
- Prevention of Admin Self-Registration

### UI (In Progress)
- Premium Landing Page
- Responsive Design
- Product Listing
- Product Details
- Shopping Cart
- Checkout
- User Dashboard
- Admin Dashboard

---

## 📂 Project Structure

```
Clear_skin/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── .env.example
│   ├── package.json
│
├── doc/
│
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/tejashwi54/skin_care.git
```

### Install Frontend

```bash
cd client
npm install
npm run dev
```

### Install Backend

```bash
cd server
npm install
npm run dev
```

---

## 📅 Development Timeline

### ✅ Day 1
- Requirement Analysis
- Project Setup
- MongoDB Atlas Configuration
- Authentication Module
- JWT Authentication
- Password Hashing
- Secure Cookies
- Validation
- Rate Limiting

### 🔄 Upcoming
- Homepage UI
- Authentication UI
- Product Module
- Cart & Checkout
- User Dashboard
- Admin Dashboard
- Testing
- Deployment

---

## 🛡️ Security Features

- Password Hashing using bcrypt
- JWT Authentication
- httpOnly Cookies
- Rate Limiting
- Input Validation
- Centralized Error Handling
- Secure Environment Variables
- Prevention of Admin Privilege Escalation

---

## 📌 Project Status

🚧 **Currently Under Development**

Authentication module is completed. UI development and remaining e-commerce features are in progress.

---

## 👨‍💻 Developer

**Tejashwi Bharti**

GitHub: https://github.com/tejashwi54

---

## 📄 License

This project is developed for learning and internship purposes.