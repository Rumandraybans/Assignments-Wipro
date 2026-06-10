import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); 

import { routes } from "./routes/webRoutes.js";
import { connectdb } from "./connectDb.js";

var app = express();
const port = process.env.PORT || 3003; 

app.use(cors());
app.use(express.json());
app.use(routes);

connectdb();

app.listen(port, () => {
    console.log(`App is listening at port no ${port}`);
});