# eCommerce Website using MERN Stack

This is a full-stack eCommerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application includes user-facing features for browsing and purchasing products, as well as an admin dashboard for managing the store.

## Features

### User Functionality
- **Product Exploration**: Browse, filter, and sort products.
- **Product Details**: View product variants (e.g., size) and add products to the cart.
- **Checkout**: Place orders by providing delivery information.
- **Payment Methods**:
  - Cash on Delivery (COD)
  - Online Payments via **Stripe** and **Razorpay**.

### Admin Dashboard
- **Product Management**: Add, delete, and manage products.
- **Order Management**: View and manage user orders.
- **Data Storage**: User, product, and order data are stored securely in MongoDB.

## Tech Stack

### Frontend
- **React.js**: User interface development.
- **CSS/SCSS**: Styling.

### Backend
- **Node.js**: Backend server.
- **Express.js**: API development.

### Database
- **MongoDB**: Data storage for products, users, and orders.

### Payment Gateways
- **Stripe**: Online payment processing.
- **Razorpay**: Online payment processing.


## Installation

### Prerequisites
- Node.js installed on your machine.
- MongoDB server (local or cloud-based, e.g., MongoDB Atlas).
- Stripe and Razorpay accounts for payment integration.

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohammedabdelraouf/E-Commerce-website.git
   cd E-Commerce-website
   ```

2. **Install dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the backend directory with the following:
     ```env
     MONGO_URI=your-mongodb-connection-string
     STRIPE_SECRET_KEY=your-stripe-secret-key
     RAZORPAY_KEY_ID=your-razorpay-key-id
     RAZORPAY_SECRET=your-razorpay-secret
     ```
   - Replace placeholder values with your credentials.

4. **Run the development servers**:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
