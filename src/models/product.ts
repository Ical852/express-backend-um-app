import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public imageUrl!: string;
  public categoryId!: number;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
