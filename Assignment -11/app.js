import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import studentRoutes from './routes/studentRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=>
{
    console.log("Database Connected");
})
.catch((error)=>
{
    console.log(error.message);
});

app.use('/students',studentRoutes);

app.listen(3000,()=>
{
    console.log("Server started at port 3000");
});