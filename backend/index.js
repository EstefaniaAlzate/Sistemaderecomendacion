import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import acudeRoutes from "./routes/acude.routes.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes,acudeRoutes);


app.listen(3000, "localhost", () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
