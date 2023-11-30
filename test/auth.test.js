import supertest, { agent } from "supertest";
import { web } from "../src/application/web.js";
import { createTestUser, removeTestUser } from "./test-util.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/auth/register", () => {
    afterEach(async () => {
        await removeTestUser();
    });

    it("should can register new user", async () => {
        const result = await supertest(web).post("/api/auth/register").send({
            firstName: "test",
            lastName: "test",
            email: "test@email.com",
            password: "password",
            phone: "0811111",
        });

        expect(result.status).toBe(201);
        expect(result.body.data.firstName).toBe("test");
        expect(result.body.data.lastName).toBe("test");
        expect(result.body.data.email).toBe("test@email.com");
        expect(result.body.data.phone).toBe("0811111");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request invalid", async () => {
        const result = await supertest(web).post("/api/auth/register").send({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if email is registered", async () => {
        let result = await supertest(web).post("/api/auth/register").send({
            firstName: "test",
            lastName: "test",
            email: "test@email.com",
            password: "password",
            phone: "0811111",
        });

        expect(result.status).toBe(201);
        expect(result.body.data.firstName).toBe("test");
        expect(result.body.data.lastName).toBe("test");
        expect(result.body.data.email).toBe("test@email.com");
        expect(result.body.data.phone).toBe("0811111");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web).post("/api/auth/register").send({
            firstName: "test",
            lastName: "test",
            email: "test@email.com",
            password: "password",
            phone: "0811111",
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("POST /api/auth/login", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can login", async () => {
        const result = await supertest(web).post("/api/auth/login").send({
            email: "test@email.com",
            password: "password",
        });

        logger.info(result);
        expect(result.body).toHaveProperty("data");
    });

    it("should reject if request is invalid", async () => {
        const result = await supertest(web).post("/api/auth/login").send({
            email: "",
            password: "",
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if password is wrong", async () => {
        const result = await supertest(web).post("/api/auth/login").send({
            email: "test@email.com",
            password: "salaahhhhh",
        });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("invalid email or password");
    });

    it("should reject if email is wrong", async () => {
        const result = await supertest(web).post("/api/auth/login").send({
            email: "salah@email.com",
            password: "password",
        });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("invalid email or password");
    });
});
