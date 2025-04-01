import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next)=>{
    try {
        
    } catch (error) {
        res.status(401).json({error: 'You are not authorized to access this route.'});
    }

}