import app from "./app";
import connectToDatabase from "./models";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectToDatabase(); // Conecta a la base de datos y sincroniza los modelos

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
