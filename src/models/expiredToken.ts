import { Model, DataTypes } from "sequelize";
import sequelize from "../configs/database";

class ExpiredToken extends Model {
  public id!: number;
  public token!: string;
}

ExpiredToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "expired_tokens",
  }
);

export default ExpiredToken;
