import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

web.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});
