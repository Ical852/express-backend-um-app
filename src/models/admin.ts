import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Admin extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public birthDate!: Date;
  public gender!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "admins",
  }
);

export default Admin;
