import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() =>
{
    console.log("Database Connected");
})
.catch((error) =>
{
    console.log(error.message);
});

app.use('/', studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
{
    console.log(`Server started at port ${PORT}`);
});