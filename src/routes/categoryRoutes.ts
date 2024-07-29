import { Router } from "express";
import {
  getCategories,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getCategories);
router.get("/:id", authMiddleware, getCategoryDetail);
router.post("/", authMiddleware, createCategory);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
