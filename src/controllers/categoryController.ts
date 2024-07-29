import { Request, Response } from "express";
import Category from "../models/category";
import { response } from "../utils/response";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    return response(res, 200, "Success to get category data", categories);
  } catch (error) {
    return response(res, 500, "Failed to get category data", null);
  }
};

export const getCategoryDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categories = await Category.findByPk(id);
    return response(
      res,
      200,
      "Success to get category detail data",
      categories
    );
  } catch (error) {
    return response(res, 500, "Failed to get category detail data", null);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    return response(res, 201, "Success to create category", category);
  } catch (error) {
    return response(res, 500, "Failed to create category", null);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return response(res, 404, "Category not found", null);
    }
    await category.update({ name, description });
    return response(res, 200, "Success to update category", category);
  } catch (error) {
    return response(res, 500, "Failed to update category", null);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return response(res, 404, "Category not found", null);
    }
    await category.destroy();
    return response(res, 200, "Success to delete category", null);
  } catch (error) {
    return response(res, 500, "Failed to delete category", null);
  }
};
