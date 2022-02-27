import express, { json } from "express";
import morgan from "morgan";
import { authRouter } from "./routes/auth.routes.js";
import { tareaRouter } from "./routes/tarea.routes.js";
import { archivosTareaRouter } from "./routes/archivos.routes.js";
import { usuariosRouter } from "./routes/usuarios.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(json());

app.use(authRouter);
app.use(tareaRouter);
app.use(archivosTareaRouter);
app.use(usuariosRouter);

const PORT = process.env.PORT ?? 5432;

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT} (⌐■_■)`);
});
