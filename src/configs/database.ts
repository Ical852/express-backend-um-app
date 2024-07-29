import { Sequelize } from "sequelize";

const sequelize = new Sequelize("um-app", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
