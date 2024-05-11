import express from "express";
import { createUserController, loginUser } from "../../../Controller/userController.js";

const router = express.Router();

router.post("/createUser", createUserController);
router.post("/login", loginUser)

export default router;
