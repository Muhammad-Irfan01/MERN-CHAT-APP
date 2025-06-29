import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(400).json({message : 'unauthorized, no token provided'});

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded) return res.status(400).json({message : 'unauthorized, invalid token'});

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(400).json({message : 'user not found'});

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message : 'internal server error'});
    }
}