import { Router } from "express";
import {
  createAdmin,
  loginAdmin,
  fetchAdmin,
  update,
  logout,
  updateAdmin,
  getAdmins,
  deleteAdmin,
} from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Admin Session
router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.get("/fetch", authMiddleware, fetchAdmin);
router.post("/update", authMiddleware, update);
router.post("/logout", authMiddleware, logout);

// Admin Data
router.get("/", authMiddleware, getAdmins);
router.put("/:id", authMiddleware, updateAdmin);
router.delete("/:id", authMiddleware, deleteAdmin);

export default router;
