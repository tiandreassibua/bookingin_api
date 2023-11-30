import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        throw new ResponseError(401, "You are not authenticated");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw new ResponseError(403, "Token is not valid");
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            throw new ResponseError(403, "You are not authorized");
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            throw new ResponseError(403, "You are not authorized");
        }
    });
};
