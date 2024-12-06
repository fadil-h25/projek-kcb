import express from "express";
import {
  addDosen,
  addMahasiswa,
  getAdmin,
  getAllDosen,
  getAllItems,
  getAllMahasiswa,
} from "../Controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/items", getAllItems);
adminRouter.get("/lectures", getAllDosen);
adminRouter.get("/students", getAllMahasiswa);
adminRouter.post("/lectures", addDosen);
adminRouter.post("/students", addMahasiswa);
adminRouter.get("/:adminId", getAdmin);

export default adminRouter;
