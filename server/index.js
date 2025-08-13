import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './router/auth.router.js'
import messageRoutes from './router/message.router.js'
import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import {server} from './lib/socket.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve()
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () =>{
    console.log('app is running on port : ' + PORT);
    ConnectDB();
})