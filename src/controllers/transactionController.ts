import { Request, Response } from "express";
import Transaction from "../models/transaction";
import Product from "../models/product";
import { response } from "../utils/response";
import Category from "../models/category";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: Product,
          as: "product",
          include: [{ model: Category, as: "category" }],
        },
      ],
    });
    return response(res, 200, "Success to get transactions data", transactions);
  } catch (error) {
    return response(res, 500, "Failed to get transactions data", null);
  }
};

export const getTransactionDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        },
      ],
    });
    if (!transaction) {
      return response(res, 404, "Transaction not found", null);
    }
    return response(
      res,
      200,
      "Success to get transaction detail data",
      transaction
    );
  } catch (error) {
    return response(res, 500, "Failed to get transaction detail data", null);
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, type } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return response(res, 404, "Product not found", null);
    }
    if (type === "out" && product.stock < quantity) {
      return response(res, 400, "Insufficient Produc Stock", null);
    }

    if (type === "out") {
      product.stock -= quantity;
    } else if (type === "in") {
      product.stock += quantity;
    }

    await product.save();
    const transaction = await Transaction.create({ productId, quantity, type });
    return response(res, 201, "Success to create new transaction", transaction);
  } catch (error) {
    return response(res, 500, "Failed to create new transaction", null);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return response(res, 404, "Transaction not found", null);
    }
    await transaction.destroy();
    return response(res, 201, "Success to delete transaction", null);
  } catch (error) {
    return response(res, 500, "Failed to delete transaction", null);
  }
};
