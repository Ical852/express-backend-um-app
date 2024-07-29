import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Transaction extends Model {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("in", "out"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
  }
);

export default Transaction;
