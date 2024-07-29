import { Router } from "express";
import {
  getTransactions,
  getTransactionDetail,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTransactions);
router.get("/:id", authMiddleware, getTransactionDetail);
router.post("/", authMiddleware, createTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
