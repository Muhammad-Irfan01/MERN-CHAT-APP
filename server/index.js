import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './router/auth.router.js'
import messageRoutes from './router/message.router.js'
import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))


app.listen(PORT, () =>{
    console.log('app is running on port : ' + PORT);
    ConnectDB();
})