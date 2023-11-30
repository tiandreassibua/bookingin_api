import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
    createTestUser,
    createTestUserAdmin,
    removeTestUser,
    removeTestUserAdmin,
} from "./test-util.js";
import { generateToken } from "../src/utils/jwt.js";
import { prismaClient } from "../src/application/database.js";

describe("GET /api/users/:id", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can get user current", async () => {
        const user = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({ id: user.id, isAdmin: true });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .get(`/api/users/${user.id}`)
            .set("Cookie", [`access_token=${token}`]);

        expect(result.status).toBe(200);
        expect(result.body.data.firstName).toBe(user.firstName);
        expect(result.body.data.lastName).toBe(user.lastName);
        expect(result.body.data.email).toBe(user.email);
        expect(result.body.data.phone).toBe(user.phone);
    });

    it("should reject if token is not valid", async () => {
        const user = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({ id: user.id, isAdmin: true });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .get(`/api/users/${user.id}`)
            .set("Cookie", [`access_token=salah`]);

        logger.info(result.body);

        expect(result.status).toBe(403);
        expect(result.body.errors).toBe("Token is not valid");
    });
});

describe("PATCH /api/users/:id", () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestUserAdmin();
    });

    afterEach(async () => {
        await removeTestUser();
        await removeTestUserAdmin();
    });

    it("should can update own user profile", async () => {
        const user = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({
            id: user.id,
            isAdmin: user.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .patch("/api/users/" + user.id)
            .set("Cookie", [`access_token=${token}`])
            .send({
                firstName: "test update",
                lastName: "test update",
                phone: "0855555",
            });

        logger.info(result.body.data);

        expect(result.status).toBe(200);
        expect(result.body.data.firstName).toBe("test update");
        expect(result.body.data.lastName).toBe("test update");
        expect(result.body.data.phone).toBe("0855555");
    });

    it("should can update user own password", async () => {
        const user = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({
            id: user.id,
            isAdmin: user.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .patch("/api/users/" + user.id)
            .set("Cookie", [`access_token=${token}`])
            .send({
                password: "rahasia",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("data");
        expect(result.body.data.firstName).toBe("test");
    });

    it("should can update other user profile by admin", async () => {
        const user = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const admin = await prismaClient.user.findUnique({
            where: {
                email: "admin@email.com",
            },
        });

        const token = await generateToken({
            id: admin.id,
            isAdmin: admin.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .patch("/api/users/" + user.id)
            .set("Cookie", [`access_token=${token}`])
            .send({
                firstName: "test update by admin",
                lastName: "test update by admin",
                phone: "0855555",
            });

        logger.info(result.body.data);

        expect(result.status).toBe(200);
        expect(result.body.data.firstName).toBe("test update by admin");
        expect(result.body.data.lastName).toBe("test update by admin");
        expect(result.body.data.phone).toBe("0855555");
    });

    it("should reject if update other user profile if isAdmin false", async () => {
        const user = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const other = await prismaClient.user.findUnique({
            where: {
                email: "admin@email.com",
            },
        });

        const token = await generateToken({
            id: user.id,
            isAdmin: user.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .patch("/api/users/" + other.id)
            .set("Cookie", [`access_token=${token}`])
            .send({
                firstName: "test update by admin",
                lastName: "test update by admin",
                phone: "0855555",
            });

        logger.info(result.body);

        expect(result.status).toBe(403);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/users", () => {
    beforeEach(async () => {
        await createTestUserAdmin();
    });

    afterEach(async () => {
        await removeTestUserAdmin();
    });

    it("should can get all user data by admin", async () => {
        const admin = await prismaClient.user.findUnique({
            where: {
                email: "admin@email.com",
            },
        });

        const totalUser = await prismaClient.user.count();

        const token = await generateToken({
            id: admin.id,
            isAdmin: admin.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .get("/api/users")
            .set("Cookie", [`access_token=${token}`]);

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("data");
        expect(result.body.data.length).toBe(totalUser);
    });

    it("should reject if token is not valid", async () => {
        const admin = await prismaClient.user.findUnique({
            where: {
                email: "admin@email.com",
            },
        });

        const token = await generateToken({
            id: admin.id,
            isAdmin: admin.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .get("/api/users")
            .set("Cookie", [`access_token=salah`]);

        expect(result.status).toBe(403);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if user non admin get user list", async () => {
        await createTestUser();

        const test = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({
            id: test.id,
            isAdmin: test.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .get("/api/users")
            .set("Cookie", [`access_token=${token}`]);

        logger.info(result.body.errors);

        expect(result.status).toBe(403);
        expect(result.body.errors).toBeDefined();

        await removeTestUser();
    });
});

describe("DELETE /api/users/:id", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can delete user account", async () => {
        const test = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({
            id: test.id,
            isAdmin: test.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .delete("/api/users/" + test.id)
            .set("Cookie", [`access_token=${token}`]);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    });

    it("should reject if delete other user account", async () => {
        const test = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const token = await generateToken({
            id: test.id,
            isAdmin: test.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .delete("/api/users/99")
            .set("Cookie", [`access_token=${token}`]);

        expect(result.status).toBe(403);
        expect(result.body.errors).toBeDefined();
    });

    it("should can delete user account by admin", async () => {
        await createTestUserAdmin();

        const test = await prismaClient.user.findUnique({
            where: {
                email: "test@email.com",
            },
        });

        const admin = await prismaClient.user.findUnique({
            where: {
                email: "admin@email.com",
            },
        });

        const token = await generateToken({
            id: admin.id,
            isAdmin: admin.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .delete("/api/users/" + test.id)
            .set("Cookie", [`access_token=${token}`]);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        await removeTestUserAdmin();
    });

    it("should reject if admin delete user account not found", async () => {
        await createTestUserAdmin();

        const admin = await prismaClient.user.findUnique({
            where: {
                email: "admin@email.com",
            },
        });

        const token = await generateToken({
            id: admin.id,
            isAdmin: admin.isAdmin,
        });

        web.get("/set-cookie", (req, res) => {
            res.cookie("access_token", token, { httpOnly: true });
        });

        const result = await supertest(web)
            .delete("/api/users/999")
            .set("Cookie", [`access_token=${token}`]);

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBe("user is not found");

        await removeTestUserAdmin();
    });
});
