import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";
import { response } from "../utils/response";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    return response(res, 200, 'Success to get products data', products);
  } catch (error) {
    return response(res, 500, "Failed to get products data", null);
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return response(res, 404, "Product Not Found", null)
    }
    return response(res, 200, "Success to get product detail", product);
  } catch (error) {
    return response(res, 500, "Failed to get product detail", null);
  }
};

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
    return response(res, 201, "Success to create new product", product);
  } catch (error) {
    return response(res, 500, "Failed to create new product", null);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, categoryId, stock } = req.body;
    const product = await Product.findByPk(id);
    const category = await Category.findByPk(categoryId);
    if (!product) {
      return response(res, 404, "Product not found", null)
    }
    if (!category) {
      return response(res, 404, "Category not found", null);
    }
    await product.update({ name, description, imageUrl, categoryId, stock });
    return response(res, 200, "Success to update product", product);
  } catch (error) {
    return response(res, 500, "Failed to update product", null);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return response(res, 404, "Product not found", null);
    }
    await product.destroy();
    return response(res, 200, "Success to delete product", null);
  } catch (error) {
    return response(res, 500, "Failed to delete product", null);
  }
};
