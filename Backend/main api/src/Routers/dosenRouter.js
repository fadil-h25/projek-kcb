import expres from "express";
import dosenController from "../Controllers/dosenController.js";

const router = expres.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "berhasil di lecture",
  });
});
router.get("/:lectureId", dosenController.getDosenById);
router.get("/:lectureId/attendances", dosenController.getAllAbsenByDosenId);
router.get(
  "/attendances/:attendanceId/details",
  dosenController.getAllDetailAbsenByAbsenId
);

router.post(
  "/attendances/:attendanceId/details",
  dosenController.addDetailAbsen
);
router.post("/attendances", dosenController.addAbsen);

export default router;
