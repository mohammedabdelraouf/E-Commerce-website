import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import coonnectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000
coonnectDB();
connectCloudinary();

// middelwares
app.use(express.json());
app.use(cors());


// api endpoints
app.use('/api/user', userRouter)
app.get('/',(req,res)=>{
    res.send("API Working.....")
});

app.listen(port,()=>{
    console.log('Server started on port :' + port);
    
})
