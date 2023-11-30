import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { errorMiddleware } from "../middleware/error-middleware.js";
import publicRoute from "../route/public-route.js";
import privateRoute from "../route/private-route.js";

export const web = express();
web.use(bodyParser.urlencoded({ extended: false }));
web.use(express.json());
web.use(cookieParser());
web.use(morgan("common"));
web.use(cors());

// home route
web.get("/api", (req, res) => {
    res.json({
        name: "BookingIn API",
        version: "1.0.0",
        message:
            "Selamat datang di BookingIn API, api untuk final project pada studi independen vocasia batch 5",
    });
});

// routes
web.use(publicRoute);
web.use(privateRoute);

web.use(errorMiddleware);
