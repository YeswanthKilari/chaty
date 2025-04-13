import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized person" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({message: "token Invalid"})
        }

        const user = await User.findById(decode.userId).select("-password")
        req.user = user;
        next();


    } catch (error) {
        console.log("error in the middleware : ",error.message)
        res.status(401).json({error: 'You are not authorized to access this route.'});
    }

}