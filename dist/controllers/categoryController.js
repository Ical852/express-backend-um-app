"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryDetail = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const response_1 = require("../utils/response");
const getCategories = async (req, res) => {
    try {
        const categories = await category_1.default.findAll();
        return (0, response_1.response)(res, 200, "Success to get category data", categories);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to get category data", null);
    }
};
exports.getCategories = getCategories;
const getCategoryDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await category_1.default.findByPk(id);
        return (0, response_1.response)(res, 200, "Success to get category detail data", categories);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to get category detail data", null);
    }
};
exports.getCategoryDetail = getCategoryDetail;
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await category_1.default.create({ name, description });
        return (0, response_1.response)(res, 201, "Success to create category", category);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to create category", null);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await category_1.default.findByPk(id);
        if (!category) {
            return (0, response_1.response)(res, 404, "Category not found", null);
        }
        await category.update({ name, description });
        return (0, response_1.response)(res, 200, "Success to update category", category);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to update category", null);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await category_1.default.findByPk(id);
        if (!category) {
            return (0, response_1.response)(res, 404, "Category not found", null);
        }
        await category.destroy();
        return (0, response_1.response)(res, 200, "Success to delete category", null);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to delete category", null);
    }
};
exports.deleteCategory = deleteCategory;
