import jwt from "jsonwebtoken";

const generateToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

export { generateToken };
