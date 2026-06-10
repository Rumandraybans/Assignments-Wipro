import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        
        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            email,
            password: hashPassword
        });

        await user.save();
        res.json({ message: "User has been registered successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User with email not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(401).json({ message: "Unauthorised User, Invalid password" });
        }

        
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        
        res.json({
            message: "Login is successful",
            token,
            email: user.email 
        });
    }
    catch (error) { 
        res.status(500).json({ error: error.message });
    }
};


const getProfile = async (req, res) => {
    try {
        const { email } = req.query; 
        const user = await User.findOne({ email }).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { register, login, getProfile, getAllUsers };
