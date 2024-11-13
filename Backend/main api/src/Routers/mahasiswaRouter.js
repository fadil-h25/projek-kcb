import express from "express";
import mahasiswaController from "../Controllers/mahasiswaController.js";

const router = express.Router();

router.get("/:studentId/details", mahasiswaController.getAllDetailAbsenById);
router.get("/:studentId", mahasiswaController.getMahasiswaById);

export default router;
