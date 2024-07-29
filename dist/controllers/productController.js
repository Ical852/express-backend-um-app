"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProducts = exports.updateProduct = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const category_1 = __importDefault(require("../models/category"));
const response_1 = require("../utils/response");
const createProduct = async (req, res) => {
    try {
        const { name, description, imageUrl, categoryId, stock } = req.body;
        const category = await category_1.default.findByPk(categoryId);
        if (!category) {
            return (0, response_1.response)(res, 404, "Category not found", null);
        }
        const product = await product_1.default.create({
            name,
            description,
            imageUrl,
            categoryId,
            stock,
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, imageUrl, categoryId, stock } = req.body;
        const product = await product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        await product.update({ name, description, imageUrl, categoryId, stock });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
};
exports.updateProduct = updateProduct;
const getProducts = async (req, res) => {
    try {
        const products = await product_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
exports.getProducts = getProducts;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        await product.destroy();
        res.json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
};
exports.deleteProduct = deleteProduct;
