import sequelize from "../config/database";
import User from "./User"; // Importa todos tus modelos aquí

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();

    // Sincroniza los modelos con la base de datos
    await User.sync(); // Esto creará la tabla 'users' si no existe
  } catch (error) {
    console.error("Error conectándose a la base de datos:", error);
  }
};

export default connectToDatabase;
