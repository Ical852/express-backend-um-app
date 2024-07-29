import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./configs/database";
import adminRoutes from "./routes/adminRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
