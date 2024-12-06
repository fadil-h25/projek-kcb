import express from "express";
import mahasiswaController from "../Controllers/mahasiswaController.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/:studentId/details", mahasiswaController.getAllDetailAbsenById);
router.post(
  "/:studentId/profile",
  upload.single("img"),
  mahasiswaController.uploadProfileImg
);
router.get("/:studentId", mahasiswaController.getMahasiswaById);

export default router;
