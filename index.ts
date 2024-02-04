import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todosRoutes from './src/routes/todosRoutes';
import userRoutes from './src/routes/userRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
const dbUrl = process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/todos',todosRoutes);

app.all('*',(req,res)=>{
  res.status(401).json({error:"Not found"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
mongoose.connect(`${dbUrl}`)
