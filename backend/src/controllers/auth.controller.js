import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { generateToken } from '../lib/util.js';

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password) { 
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: hashpassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(500).json({ message: "Server Error" });
        }
    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const ispassword = await bcrypt.compare(password, user.password);
        if (!ispassword) { 
            return res.status(401).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);

        res.json({ message: "Logged in successfully" });
    } catch (error) {
        console.log("error in login controller", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.json({ message: "Logged out successfully" });
    } catch (error) { 
        console.log("error in logout controller", error);
        res.status(500).json({ message: "Server Error" });
    }
}


export const updateprofile = async (req, res) => {
    
};