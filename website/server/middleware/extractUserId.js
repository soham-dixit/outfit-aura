import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const extractUserId = (req, res, next) => {
    // Extract token from cookie 
    const token = req.cookies["auth-token"];
    if (!token) {
        return createError(req, res, next, "Access denied", 401);
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
}