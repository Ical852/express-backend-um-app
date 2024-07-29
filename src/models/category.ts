import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
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
  },
  {
    sequelize,
    tableName: "categories",
  }
);

export default Category;
