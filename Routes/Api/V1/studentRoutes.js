import express from "express";
import {
  createStudentController,
  deleteStudentByIdContoller,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentByIdController,
} from "../../../Controller/studentContoller.js";

const router = express.Router();

router.post("/createStudent", createStudentController);
router.get("/getAllStudents", getAllStudentsController);
router.get("/getStudent/:id", getStudentByIdController);
router.put("/updateStudent/:id", updateStudentByIdController);
router.delete("/deleteStudent/:id", deleteStudentByIdContoller);

export default router;
