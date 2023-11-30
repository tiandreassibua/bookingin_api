import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            firstName: {
                contains: "test",
            },
        },
    });
};

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            firstName: "test",
            lastName: "test",
            email: "test@email.com",
            phone: "0811111",
            password: await bcrypt.hash("password", 10),
        },
    });
};

const createTestUserAdmin = async () => {
    await prismaClient.user.create({
        data: {
            firstName: "admin",
            lastName: "admin",
            email: "admin@email.com",
            phone: "0899999",
            password: await bcrypt.hash("password", 10),
            isAdmin: true,
        },
    });
};

const removeTestUserAdmin = async () => {
    await prismaClient.user.delete({
        where: {
            email: "admin@email.com",
        },
    });
};

export {
    removeTestUser,
    createTestUser,
    createTestUserAdmin,
    removeTestUserAdmin,
};
