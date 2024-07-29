"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getAdmins = exports.logout = exports.update = exports.fetchAdmin = exports.loginAdmin = exports.createAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../models/admin"));
const expiredToken_1 = __importDefault(require("../models/expiredToken"));
const response_1 = require("../utils/response");
const jwtKey_1 = require("../utils/jwtKey");
const createAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, birthDate, gender, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await admin_1.default.create({
            firstName,
            lastName,
            email,
            birthDate,
            gender,
            password: hashedPassword,
        });
        return (0, response_1.response)(res, 201, "Success register admin", admin);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to create admin", null);
    }
};
exports.createAdmin = createAdmin;
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_1.default.findOne({ where: { email } });
        if (!admin) {
            return (0, response_1.response)(res, 404, "Admin not found", null);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            return (0, response_1.response)(res, 401, "Invalid password", null);
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.id }, jwtKey_1.jwtKey, {
            expiresIn: "1h",
        });
        return (0, response_1.response)(res, 201, "Login success", token);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Login Failed", null);
    }
};
exports.loginAdmin = loginAdmin;
const fetchAdmin = async (req, res) => {
    try {
        const admin = await admin_1.default.findByPk(req.user.id);
        if (!admin) {
            return (0, response_1.response)(res, 500, "Admin not found", null);
        }
        return (0, response_1.response)(res, 200, "Success to fetch admin", admin);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to fetch admins", null);
    }
};
exports.fetchAdmin = fetchAdmin;
const update = async (req, res) => {
    try {
        const { firstName, lastName, birthDate, gender } = req.body;
        const admin = await admin_1.default.findByPk(req.user.id);
        if (!admin) {
            return (0, response_1.response)(res, 500, "Admin not found", null);
        }
        await admin.update({ firstName, lastName, birthDate, gender });
        return (0, response_1.response)(res, 200, "Success to update profile", admin);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to update profile", null);
    }
};
exports.update = update;
const logout = async (req, res) => {
    try {
        const token = req.token;
        await expiredToken_1.default.create({ token });
        return (0, response_1.response)(res, 200, "Logout success", null);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Logout Failed", null);
    }
};
exports.logout = logout;
const getAdmins = async (req, res) => {
    try {
        const admins = await admin_1.default.findAll();
        return (0, response_1.response)(res, 200, "Success to get admin data", admins);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to get admin data", null);
    }
};
exports.getAdmins = getAdmins;
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, birthDate, gender } = req.body;
        const admin = await admin_1.default.findByPk(id);
        if (!admin) {
            return (0, response_1.response)(res, 404, "Admin not found", null);
        }
        await admin.update({ firstName, lastName, birthDate, gender });
        return (0, response_1.response)(res, 200, "Success to update admin data", admin);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to update admin data", null);
    }
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await admin_1.default.findByPk(id);
        if (!admin) {
            return (0, response_1.response)(res, 404, "Admin not found", null);
        }
        await admin.destroy();
        return (0, response_1.response)(res, 200, "Success to delete admin", null);
    }
    catch (error) {
        return (0, response_1.response)(res, 500, "Failed to delete admin", null);
    }
};
exports.deleteAdmin = deleteAdmin;
