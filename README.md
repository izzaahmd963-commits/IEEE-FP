# IEEE-FP
# 🛒 MERN E-Commerce Platform

## 📌 Project Overview
A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform supports both **Multi-Vendor** and **Single-Vendor** modes, making it versatile for different business needs like local artisans, boutique owners, and independent creators.

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication with bcrypt password hashing
- Role-based access control (Admin, Vendor, Customer)
- Protected routes and middleware for security

### 🏪 Multi-Vendor Mode
- Multiple sellers can register and list products
- Each vendor has their own dashboard
- Platform commission (10%) on each sale
- Separate vendor profiles and product listings

### 🏬 Single-Vendor Mode
- Single brand/store owner (Admin = Vendor)
- No commission calculations
- Ideal for niche products (handmade, artisanal, etc.)

### 📦 Product Management
- Complete CRUD operations for products
- Cloudinary integration for image uploads
- Categories, stock management, soft delete
- Product search and filtering

### 🛒 Shopping Cart
- Redux-powered cart with localStorage persistence
- Multi-vendor cart support (items from different vendors)
- Quantity updates and item removal

### 💳 Order System
- Order creation with shipping address
- Stripe payment integration (ready to implement)
- Order status tracking (Pending, Paid, Processing, etc.)
- Order history for customers

### 📊 Vendor Dashboard
- Sales analytics and revenue tracking
- Product management interface
- Low stock alerts
- Commission breakdown

### 👑 Admin Panel
- User management (activate/deactivate)
- Platform statistics
- All orders overview
- Vendor approvals

### 📱 Responsive Design
- Mobile-first approach with Tailwind CSS
- Works on all screen sizes
- Modern and clean UI


## 🛠️ Technologies Used

### **Frontend**
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building components |
| **Redux Toolkit** | State management (cart, auth, products) |
| **React Router DOM** | Navigation and routing |
| **Tailwind CSS** | Styling and responsive design |
| **Vite** | Build tool and development server |
| **Axios** | HTTP client for API calls |

### **Backend**
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image storage and management |
| **Multer** | File upload handling |
| **Stripe** | Payment processing (ready) |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub** | Code hosting |
| **Nodemon** | Auto-restart during development |
| **Postman** | API testing |
| **MongoDB Compass** | Database GUI |
| **Vercel** | Frontend deployment |
| **Render** | Backend deployment |

---
## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Git

### **Step-by-Step Setup**

#### 1. Clone the Repository
```bash
git clone https://github.com/izzaahmd963-commits/IEEE-FP
cd IEEE-Final-project
