# IEEE-FP

# 🛒 MERN E-Commerce Platform (Multi-Vendor & Single-Vendor)
## 📌 Project Overview
A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform supports both **Multi-Vendor** and **Single-Vendor** modes, making it versatile for different business needs like local artisans, boutique owners, and independent creators.

## 🛠️ **COMPLETE TECHNOLOGIES USED**

### 🎨 **FRONTEND TECHNOLOGIES**

| **Technology** | **Version** | **Purpose** | **Why Used** |
|----------------|-------------|-------------|--------------|
| **React** | 18.2.0 | UI Library | Component-based architecture, reusable components, virtual DOM for performance |
| **React DOM** | 18.2.0 | DOM rendering | Renders React components to the browser |
| **React Router DOM** | 6.8.0 | Navigation | Handles routing, protected routes, nested routes |
| **Redux Toolkit** | 1.9.5 | State Management | Manages global state (auth, cart, products) with less boilerplate |
| **React Redux** | 8.1.1 | React bindings | Connects React components to Redux store |
| **Axios** | 1.4.0 | HTTP Client | Makes API calls, handles requests/responses, interceptors for tokens |
| **Tailwind CSS** | 3.3.3 | Styling | Utility-first CSS framework, responsive design, no custom CSS files |
| **PostCSS** | 8.4.27 | CSS processor | Processes Tailwind CSS |
| **Autoprefixer** | 10.4.14 | CSS vendor prefixes | Adds browser prefixes automatically |
| **Vite** | 4.4.5 | Build tool | Fast development server, hot module replacement, optimized builds |
| **ESLint** | 8.45.0 | Code linting | Maintains code quality and consistency |

---

### ⚙️ **BACKEND TECHNOLOGIES**

| **Technology** | **Version** | **Purpose** | **Why Used** |
|----------------|-------------|-------------|--------------|
| **Node.js** | 18.x | Runtime | JavaScript runtime for server-side code |
| **Express.js** | 4.18.2 | Web Framework | Handles routing, middleware, HTTP requests/responses |
| **MongoDB** | 6.0 | Database | NoSQL database, flexible schema for e-commerce products |
| **Mongoose** | 7.4.0 | ODM | MongoDB object modeling, schema validation, middleware hooks |
| **JSON Web Token (JWT)** | 9.0.0 | Authentication | Stateless authentication, secure user sessions |
| **bcryptjs** | 2.4.3 | Password Hashing | Encrypts passwords before storing in database |
| **Cloudinary** | 1.41.0 | Image Storage | Uploads and serves product images, CDN delivery |
| **Cloudinary Storage** | 4.0.0 | Multer storage | Integrates Cloudinary with Multer for file uploads |
| **Multer** | 1.4.5 | File Upload | Handles multipart/form-data for image uploads |
| **Stripe** | 12.14.0 | Payment Processing | Payment gateway integration (ready to implement) |
| **dotenv** | 16.3.1 | Environment Variables | Loads configuration from .env files |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing | Allows frontend to access backend APIs |
| **morgan** | 1.10.0 | Logging | Logs HTTP requests for debugging |
| **express-async-handler** | 1.2.0 | Error Handling | Wraps async route handlers to catch errors |
| **nodemon** | 3.0.1 | Development | Auto-restarts server during development |

---

### 🗄️ **DATABASE TECHNOLOGIES**

| **Technology** | **Purpose** | **Usage in Project** |
|----------------|-------------|----------------------|
| **MongoDB Atlas** | Cloud database | Hosts the database online with free tier |
| **MongoDB Compass** | GUI tool | Visually manages databases, collections, and documents |
| **Mongoose ODM** | Object modeling | Defines schemas for Users, Products, Orders |
| **MongoDB Shell (mongosh)** | Command line | Tests database connections and queries |

---

### 🔧 **DEVELOPMENT TOOLS**

| **Technology** | **Purpose** | **Why Used** |
|----------------|-------------|--------------|
| **Git** | Version control | Tracks code changes, enables collaboration |
| **GitHub** | Code hosting | Stores repository online, enables deployment |
| **VS Code** | Code editor | Powerful editor with extensions for development |
| **Postman** | API testing | Tests all backend API endpoints |
| **npm** | Package manager | Installs and manages dependencies |
| **nodemon** | Auto-restart | Automatically restarts server during development |

---

### 🚀 **DEPLOYMENT TECHNOLOGIES**

| **Technology** | **Purpose** | **Why Used** |
|----------------|-------------|--------------|
| **Vercel** | Frontend hosting | Free hosting for React apps, automatic HTTPS |
| **Render** | Backend hosting | Free hosting for Node.js apps with environment variables |
| **GitHub** | Source control | Connects to Vercel and Render for automatic deployments |

---

## 📝 **PROJECT DETAILS**

### **Database Schemas**

#### **User Schema**
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: ['Admin', 'Vendor', 'Customer'],
  storeInfo: {
    name: String,
    description: String,
    logo: String
  },
  isActive: Boolean
}
```
## Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: String,
  stock: Number,
  vendorId: ObjectId (ref: User),
  isActive: Boolean
}
```

## Order Schema
```javascript
{
  customerId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    vendorId: ObjectId
  }],
  totalAmount: Number,
  platformCommission: Number,
  status: String,
  shippingAddress: Object
}
```

## 💻 IMPORTANT COMMANDS
## Project Setup Commands
# Create project folder
```
mkdir final-project
cd final-project

# Create client and server folders
mkdir client server
```

## Backend Setup Commands
```
cd server
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken stripe cloudinary multer morgan express-async-handler
npm install -D nodemon
```
## Frontend Setup Commands
```
cd client
npm create vite@latest . -- --template react
npm install axios react-router-dom @reduxjs/toolkit react-redux
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
## Git Commands
```
# Initialize git
git init

# Create .gitignore
echo "node_modules/
.env
dist/
.DS_Store" > .gitignore

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/izzaahmd963-commits/IEEE-Final-project.git

# Push (use Personal Access Token for password)
git branch -M main
git push -u origin main
```
## Run Commands
```
# Backend
cd server
npm run dev

# Frontend (new terminal)
cd client
npm run dev
```
✅ React, Redux, Tailwind (Frontend)
✅ Node.js, Express, MongoDB (Backend)
✅ JWT, bcrypt (Authentication)
✅ Cloudinary, Multer (File Upload)
✅ Stripe (Payment - ready)
✅ Git, GitHub (Version Control)
✅ Vercel, Render (Deployment)
✅ MongoDB Atlas, Compass (Database)
