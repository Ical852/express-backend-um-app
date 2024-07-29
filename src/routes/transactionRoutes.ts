import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
