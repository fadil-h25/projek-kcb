import loginController from "../Controllers/authController.js";

import express from "express";

const router = express.Router();

router.post("", loginController.login);
router.get("/test", loginController.test);
export default router;
