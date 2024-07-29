"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data,
    });
};
exports.response = response;
