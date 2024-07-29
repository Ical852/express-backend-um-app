import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";
import { response } from "../utils/response";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, imageUrl, categoryId, stock } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return response(res, 404, "Category not found", null);
    }

    const product = await Product.create({
      name,
      description,
      imageUrl,
      categoryId,
      stock,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, categoryId, stock } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.update({ name, description, imageUrl, categoryId, stock });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
