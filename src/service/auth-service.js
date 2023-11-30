import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import {
    loginUserValidation,
    registerUserValidation,
} from "../validation/user-validation.js";
import { generateToken } from "../utils/jwt.js";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email,
        },
    });

    if (countUser > 0) {
        throw new ResponseError(400, "user already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
        },
    });
};

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            password: true,
            isAdmin: true,
        },
    });

    if (
        !user ||
        !(await bcrypt.compare(loginRequest.password, user.password))
    ) {
        throw new ResponseError(401, "invalid email or password");
    }

    const token = await generateToken({ id: user.id, isAdmin: user.isAdmin });
    const { password, isAdmin, ...data } = user;
    return { token, data };
};

export default { register, login };
