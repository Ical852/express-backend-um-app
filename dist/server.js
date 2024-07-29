"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./configs/database"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/category", categoryRoutes_1.default);
app.use("/api/product", productRoutes_1.default);
app.use("/api/transaction", transactionRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await database_1.default.authenticate();
        console.log("Database connected");
        await database_1.default.sync();
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
});
