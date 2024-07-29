import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.get("/", authMiddleware, getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
