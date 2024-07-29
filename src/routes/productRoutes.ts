import { Router } from "express";
import {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductDetail);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
