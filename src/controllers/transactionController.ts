import { Request, Response } from "express";
import Transaction from "../models/transaction";
import Product from "../models/product";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, type } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (type === "out" && product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    if (type === "out") {
      product.stock -= quantity;
    } else if (type === "in") {
      product.stock += quantity;
    }

    await product.save();
    const transaction = await Transaction.create({ productId, quantity, type });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    await transaction.destroy();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
