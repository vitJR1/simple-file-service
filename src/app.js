import "./core/env/index.js";
import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.js";
import { config } from "./core/config/index.js";

const app = express();
const PORT = config.port || 3000;

app.use(json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
