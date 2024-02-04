const express = require('express')
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const todosRoutes = require('./src/routes/todosRoutes')
const userRoutes = require('./src/routes/userRoutes')
const app = express();
const port = 3000
const dburl = process.env.DATABASE_URL;
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
mongoose.connect(`${dburl}`)
