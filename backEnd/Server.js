import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import coonnectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRouts.js';
import adminRouter from './routes/adminRouts.js';



const app = express();
coonnectDB();
connectCloudinary();

// middelwares
app.use(express.json());
app.use(cors());


// api endpoints
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/products', productRouter)


// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'E-Commerce API is running!',
    documentation: '/api-docs',
    endpoints: {
      admin: '/api/admin',
      products: '/api/products',
      users: '/api/users'
    }
  });
});



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  const actualPort = server.address().port;
  console.log(`🚀 Server is running on port ${actualPort}`);
});