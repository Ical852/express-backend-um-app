"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.getTransactions = exports.createTransaction = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
const product_1 = __importDefault(require("../models/product"));
const createTransaction = async (req, res) => {
    try {
        const { productId, quantity, type } = req.body;
        const product = await product_1.default.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (type === "out" && product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }
        if (type === "out") {
            product.stock -= quantity;
        }
        else if (type === "in") {
            product.stock += quantity;
        }
        await product.save();
        const transaction = await transaction_1.default.create({ productId, quantity, type });
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create transaction" });
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res) => {
    try {
        const transactions = await transaction_1.default.findAll();
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};
exports.getTransactions = getTransactions;
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await transaction_1.default.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        await transaction.destroy();
        res.json({ message: "Transaction deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete transaction" });
    }
};
exports.deleteTransaction = deleteTransaction;
