"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const expiredToken_1 = __importDefault(require("../models/expiredToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtKey_1 = require("../utils/jwtKey");
const response_1 = require("../utils/response");
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return (0, response_1.response)(res, 401, "Unauthorized", null);
    }
    try {
        const isExpired = await expiredToken_1.default.findOne({ where: { token } });
        if (isExpired) {
            return (0, response_1.response)(res, 500, "Token Expired", null);
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtKey_1.jwtKey);
        req.user = decoded;
        req.token = token;
        next();
    }
    catch (ex) {
        return (0, response_1.response)(res, 400, "Invalid token", null);
    }
};
exports.authMiddleware = authMiddleware;
