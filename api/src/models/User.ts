import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // El password es obligatorio
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true, // Si necesitas createdAt y updatedAt, mantenlo en true
  }
);

export default User;
