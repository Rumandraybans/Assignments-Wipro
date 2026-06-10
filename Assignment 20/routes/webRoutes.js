import express from "express";
import { register, login, getProfile, getAllUsers } from "../controllers/userController.js";

const routes = express.Router();

routes.post("/api/auth/register", register);
routes.post("/api/auth/login", login);
routes.get("/api/auth/profile", getProfile); 
routes.get("/api/auth/all-users", getAllUsers); 

export { routes };