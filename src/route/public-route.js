import express from "express";
import authController from "../controller/auth-controller.js";
import propertyController from "../controller/property-controller.js";

const router = express.Router();

// Authentication Route
router.post("/api/auth/register", authController.register);
router.post("/api/auth/login", authController.login);

router.get("/api/properties", propertyController.index);
router.get("/api/properties/:slug", propertyController.show);

export default router;
