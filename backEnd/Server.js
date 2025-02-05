import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express();
const port = process.env.port || 4000

// middelwares
app.use(express.json());
app.use(cors());

// api endpoints

app.get('/',(req,res)=>{
    res.send("API Working.....")
});

app.listen(port,()=>{
    console.log('Server started on port :' + port);
    
})
