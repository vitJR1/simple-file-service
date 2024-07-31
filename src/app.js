import "./core/env/index.js";
import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
