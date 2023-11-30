import express from "express";
import userController from "../controller/user-controller.js";
import {
    verifyAdmin,
    verifyToken,
    verifyUser,
} from "../middleware/auth-middleware.js";
import propertyController from "../controller/property-controller.js";
import roomController from "../controller/room-controller.js";
import reviewController from "../controller/review-controller.js";

const router = express.Router();

// User Route
router.get("/api/users", verifyAdmin, userController.index);
router.get("/api/users/:id", verifyUser, userController.get);
router.patch("/api/users/:id", verifyUser, userController.update);
router.delete("/api/users/:id", verifyUser, userController.remove);

// Property Route
router.post("/api/properties", verifyAdmin, propertyController.create);
router.put("/api/properties/:id", verifyAdmin, propertyController.update);

// Room Route
router.post(
    "/api/properties/:propId/rooms",
    verifyAdmin,
    roomController.create
);

router.put(
    "/api/properties/:propId/rooms/:roomId",
    verifyAdmin,
    roomController.update
);

// Review Route
router.post(
    "/api/properties/:propId/reviews",
    verifyToken,
    reviewController.create
);

export default router;
